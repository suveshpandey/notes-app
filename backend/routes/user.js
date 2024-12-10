const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET;
const { userModel, noteModel } = require('../database/db');
const { signUpAuth } = require('../middleWares/signUpMiddleWare');
const { authenticate } = require('../middleWares/authenticate');
const sendVerificationCode = require('../middleWares/email.js');

const Router = express.Router;
const userRouter = Router();

userRouter.post('/signup', signUpAuth, async (req, res) => {
    const {email, password, username} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 8);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = await userModel({
            email,
            password: hashedPassword,
            username,
            verificationCode
        })
        console.log(newUser);
        newUser.save();
        sendVerificationCode(newUser.email, verificationCode);
        res.status(201).json({message :"User signed-up successfully.",newUser})
    }
    catch(error){
        res.status(500).json({
            message: "Some error occured while signing-up", 
            error: error.message
        })
    }
})
userRouter.post('/verify-user', async (req, res) => {
    const { verificationCode } = req.body;
    console.log(verificationCode)
    try {
        const user = await userModel.findOne({ verificationCode });

        if (!user) {
            return res.status(404).json({ message: "Wrong Email." });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        // Update the user as verified
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "User verified successfully." });
    } 
    catch (error) {
        res.status(500).json({ message: "Error verifying user.", error: error.message });
    }
});
// userRouter.post('/signin', async (req, res) => {
//     const {email, password} = req.body;
//     try{
//         const user = await userModel.findOne({email});
//         if(user && await bcrypt.compare(password, user.password)){
//             const token = jwt.sign(
//                 {id: user._id},
//                 JWT_SECRET,
//                 {expiresIn: '24h'}
//             )
//             console.log("token: ", token);
//             return res.status(200).json({
//                 message: "User successfully signed-in", 
//                 email: email,
//                 username: user.username,
//                 token: token
//             });
//         }
//         else{
//             return res.status(401).json({message: "Wrong credentials"});
//         }
//     }
//     catch(error){
//         res.status(500).json({message: "Error occured while signing-in", error: error.message});
//     }
// })
userRouter.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(user && user.isVerified){
            if(user && await bcrypt.compare(password, user.password)){
                const token = jwt.sign(
                    {id: user._id},
                    JWT_SECRET,
                    {expiresIn: '24h'}
                )
                console.log("token: ", token);
                return res.status(200).json({
                    message: "User successfully signed-in",
                    email: email,
                    username: user.username,
                    token: token
                });
            }
            else{
                return res.status(401).json({message: "Wrong credentials"});
            }
        }
        else{
            return res.status(401).json({message: "The email is not verified, can't sign-in"});
        }
        
    }
    catch(error){
        res.status(500).json({message: "Error occured while signing-in", error: error.message});
    }
})
userRouter.post('/add-new-note', authenticate, async (req, res) => {
    const {title, content, date, tags} = req.body;
    try{
        const newNote = await noteModel({
            title, content, date, tags, userId: req.userId                                                                                                                                                                                                  
        })
        console.log(newNote);
        newNote.save();

        res.status(201).json({message: "Note successfully created.", newNote});
    }
    catch(error){
        res.status(500).json({
            message: "Error occured while creating new note.", 
            error: error.message
        });
    }
})
userRouter.get('/get-notes', authenticate, async (req, res) => {
    try{
        const userNotes = await noteModel.find({userId: req.userId});
        res.status(200).json({notes: userNotes});
    }
    catch(error){
        res.status(500).json({
            message: "Error while fetching notes.",
            error: error.message
        });
    }
})
userRouter.delete('/delete-note', authenticate, async (req, res) => {
    const noteId = req.body.noteId;
    try{
        await noteModel.deleteOne({
            _id: noteId
        });
        res.status(200).json({message: "Note deleted successfully."});
    }
    catch(error){
        res.status(500).json({
            message: "Some error occured while deleting the note.",
            error: error.message
        })
    }
})
userRouter.put('/update-note', authenticate, async (req, res) => {
    const { noteId, title, content, tags } = req.body;

    if (!noteId || !title || !content) {
        return res.status(400).json({ message: "Note ID, title, and content are required." });
    }

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            noteId,
            { title, content, tags },
            { new: true } // Return the updated note
        );

        if (!updatedNote) {
            console.log("Note not found with ID:", noteId);
            return res.status(404).json({ message: "Note not found" });
        }

        console.log("Updated Note:", updatedNote); // Log the updated note
        res.status(200).json(updatedNote);
    } 
    catch (error) {
        console.error("Error updating note:", error.message); // Log the error
        res.status(500).json({
            message: "Some error occurred while updating the note.",
            error: error.message
        });
    }
});
userRouter.put('/pin-note', authenticate, async (req, res) => {
    const {noteId} = req.body;
    try{
        const note = await noteModel.findOne({_id: noteId});
        if(!note) res.status(404).json({message: "Note not found."});

        note.isPinned = !note.isPinned;
        await note.save();

        res.status(200).json({message: "Note updated successfully."});
    }
    catch(error){
        res.status(500).json({message: "Server error."});
    }
})
userRouter.put('/change-password', async (req, res) => {
    const {email, newPassword} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).json({message: "User not found."});

        const newHashedPassword = await bcrypt.hash(newPassword, 8);

        user.password = newHashedPassword;
        const token = jwt.sign(
            {id: user._id},
            JWT_SECRET,
            {expiresIn: '24h'}
        )
        await user.save();
        res.status(200).json({message: "Password changed successfully.", token});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Server error while changing the password."});
    }
})


module.exports = {
    userRouter
}
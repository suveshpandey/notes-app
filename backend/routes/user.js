const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { userModel } = require('../database/db');
const { signUpAuth } = require('../middleWares/signUpMiddleWare');

const Router = express.Router;
const userRouter = Router();

userRouter.post('/signup', signUpAuth, async (req, res) => {
    const {email, password, userName} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = await userModel({
            email,
            password: hashedPassword,
            userName
        })
        newUser.save();
        res.status(201).json({message :"User signed-up successfully."})
    }
    catch(error){
        res.status(500).json({
            message: "Some error occured while signing-up", 
            error: error.message
        })
    }
})
userRouter.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                {id: user._id},
                JWT_SECRET,
                {expiresIn: '1h'}
            )
            return res.status(201).json({
                message: "User successfully signed-in", 
                email: email,
                token: token
            });
        }
        else{
            return res.status(201).json({message: "Wrong credentials"});
        }
    }
    catch(error){
        res.status(500).json({message: "Error occured while signing-in", error: error.message});
    }
})

module.exports = {
    userRouter
}
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://adminSuvesh:suveshmongo298@cluster0.y0ux6.mongodb.net/notes-app-db")
.then(() => console.log("Connected to database..."))
.catch(error => console.log("Couldn't connect to database: ", error));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    username: {
        type: String
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean, 
        default: false
    }
});
const noteSchema = new Schema({
    title: {type: String, reqired: true},
    content: {type: String, reqired: true},
    date: {type: String, reqired: true},
    tags: {
        type: [String],
        default: [],
        reqired: true
    },
    userId: {type: ObjectId},
    isPinned: {type: Boolean, default: false}
})

const userModel = mongoose.model('user', userSchema);
const noteModel = mongoose.model("Note", noteSchema);

module.exports = {
    userModel: userModel,
    noteModel: noteModel
}
const mongoose = require('mongoose');
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
    username: {type: String}
})

const userModel = mongoose.model('user', userSchema);

module.exports = {
    userModel: userModel
}
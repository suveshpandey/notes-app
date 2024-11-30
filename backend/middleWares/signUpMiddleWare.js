const { userModel } = require("../database/db");


const signUpAuth = async (req, res, next) => {
    const email = req.body.email;
    const emailRegax  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegax.test(email)){
        return res.status(400).json({message: "Invalid email format."});
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return next();
        }
        else{
            return res.status(401).json({message: "User with this email already exists."});
        }
    }
    catch(error){
        res.status(500).json({message: "Error while fetching data.", error});
    }
}
module.exports = {
    signUpAuth
}
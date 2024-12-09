const jwt = require('jsonwebtoken');
const { userModel } = require('../database/db');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const token = req.headers.token;
    if(!token) return res.status(401).json({message: "Access denied. No token provided."});

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;

        const user = await userModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: "User not found."
            });
        }
        req.user = user;
        next();
    }
    catch(error){
        res.status(400).json({message: "Invalid token."});
    }
}

module.exports = {
    authenticate: authenticate
}
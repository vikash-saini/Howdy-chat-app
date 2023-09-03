const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const {verifyToken} = require('../config/generateToken');

const validateUser = asyncHandler(async(req, res, next)=>{
    let token;
    console.log("headers: ",req.headers);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token=req.headers.authorization.split(" ")[1];

        // decode token id
        const decoded = verifyToken(token);
        console.log("decorded ",decoded);

        req.user = await User.findById(decoded.id).select("-password");
        console.log("req.user ",req.user);
        next();
        
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed")
        }
        
    }
})

module.exports = validateUser;
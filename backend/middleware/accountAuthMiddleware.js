const jwt = require("jsonwebtoken");
const asyncHandeler = require('express-async-handler');
const User = require("../models/userModel");

const verifyUserToken = asyncHandeler(async (req, res, next) =>{
    //checks to see if the user has a verifyed token

    console.log("Verifying User")

    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];//gets the token
            console.log("Decoding user token")
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);//verifys the token
            console.log("retreaving user by id: " + decoded.id);
            req.user = await User.findById(decoded.id)//gets the user
        } catch (error) {
            console.log(error);
            
            res.status(401);

            throw new Error("User not authorized: invalid token");
        }
    }

    if(!token){
        res.status(401);

        throw new Error("User not authorized: no token");
    }

    console.log("user passed check");

    next();
});

const verifyUserAdminStatus = asyncHandeler(async (req, res, next)=>{
    //checks to see if the user has admin status to allow for any admin features

    console.log("Checking User status")

    let user = req.user;

    
    if(!user){
        res.status(404)
        
        throw new Error("User was not found or specified");
    }
    console.log("User ID: " + user._id)

    if(!(user.community.role.startsWith('admin'))){
        res.status(401);

        throw new Error("User not authorized to perform action");
    }

    console.log("user passed check");

    next();
});


module.exports={
    verifyUserAdminStatus, verifyUserToken
}
const expressAsyncHandler = require("express-async-handler");
const {sendMessage} = require("../config/email");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const PendingUser = require("../models/pendingUserModel");
const User = require("../models/userModel");


const verifyEmailRegister = expressAsyncHandler( async(req, res) =>{
   try {
     console.log("Verify Email - Register");
    
    if(!req.body.username || !req.body.email || !req.body.password || !req.body.displayName){
        throw new Error("please fill all * fields");
        return;
    }

        //TODO add profanity checker for username
        //TODO add profanity checker for displayName
        //TODO add password security checker


        var usernameUser = await User.findOne({username:req.body.username});
    
        if (usernameUser){
            throw new Error("Username is taken")
            return;
        }
    
        var emailUser = await User.findOne({email:req.body.email});
    
        if(emailUser){
            throw new Error("email is already in use")
            return;
        }

        //verify email
 
        const {email, password} = req.body;
    
            //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY);
    
        await PendingUser.create({
            username:req.body.username,
            email,
            password: hashedPassword,
            displayName: req.body.displayName,
            bio: req.body.bio,
            token
        });
    
        const verificationLink = process.env.WEB_URL + `api/auth/verify/${token}`;
        await sendMessage(email, "Registration Verification", `Click here to verify your email address ${verificationLink}`, null);
    
        res.status(200).json({message:`Verification email sent to ${email}. Please check your inbox.`});
   } catch (error) {
    console.log(error);
     res.status(500).json({message:`Verification failed`});
   }
});


const verifyEmailsignin = expressAsyncHandler( async(req,res,next)=>{

});

module.exports = {
    verifyEmailRegister
}
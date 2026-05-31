const expressAsyncHandler = require("express-async-handler");
const {sendMessage} = require("../config/email");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {PendingUser} = require("../models/pendingUserModel");


const verifyEmailRegister = expressAsyncHandler( async(req, res, next) =>{
   try {
     console.log("Verify Email - Register");
 
     const {email, password} = req.body;
 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
 
     const token = jwt.sign({email}, process.env.JWT_SECRET_KEY);
 
     await PendingUser.create({
         email,
         password: hashedPassword,
         token
     });
 
     const verificationLink = process.env.WEB_URL + `verify/${token}`;
     await sendMessage(email, "Registration Verification", `Click here to verify your email address ${verificationLink}`, null);
 
     res.status(200).json({message:`Verification email sent to ${email}. Please check your inbox.`});
   } catch (error) {
     res.status(500).json({message:`Verification failed`});
   }
});


const verifyEmailsignin = expressAsyncHandler( async(req,res,next)=>{

});
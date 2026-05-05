// deals with handling authentication of users and webtraffic

const asyncHandeler = require('express-async-handler');
const User = require('../models/userModel');

//registers a new user to the system
const register = asyncHandeler(async (req, res)=>{
    console.log("register new user");

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

    //TODO add email validation

    //TODO hash password
    const passwordHash = req.body.password;

    const user = await User.create({
        username:req.body.username,
        email:req.body.email,
        passwordHash,
        profile:{
            displayName:req.body.displayName,
            bio:req.body.bio,
            avatar:null
        },
        lastVisited:Date.now()
    });

    res.status(201).json({id: user._id, username: user.username, email:user.email});
});

//logs in a user with the username and password
const login = asyncHandeler((req, res)=>{
    console.log("login user");
});

//logs out a logged in user
const logout = asyncHandeler((req, res)=>{
    console.log("logout user");
});

//unsure
const validate = asyncHandeler((req, res)=>{
    console.log("validate user");
});
 

module.exports = {
    register,
    login,
    logout,
    validate
}
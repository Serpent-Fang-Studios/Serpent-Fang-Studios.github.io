// deals with handling authentication of users and webtraffic

const asyncHandeler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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

    //hash password
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
        username:req.body.username,
        email:req.body.email,
        passwordhash,
        profile:{
            displayName:req.body.displayName,
            bio:req.body.bio,
            avatar:null
        },
        lastVisited:Date.now()
    });

    if(user){
        res.status(201).json({id: user._id, username: user.username, email:user.email, token:genToken(user._id)});
    }else{
        res.status(400);
        throw new Error("Invalid User Data");
        
    }
});

//logs in a user with the username and password
const login = asyncHandeler(async (req, res)=>{
    console.log("login user");
    const {username, password} = req.body;

    const user = await User.findOne({username}).select('+passwordhash');

    if(!user){
        res.status(404);
        throw new Error("Invalid Username or Password");
    }

    console.log(user.toObject())
    console.log(user.passwordhash);
    console.log(password);
    if(await(bcrypt.compare(password, user.passwordhash))){
        res.json({
            _id:user.id,
            name:user.name,
            token: genToken(user._id)
        })
    }else{
        res.status(404);
        throw new Error("Invalid Username or Password");
    }

    res.status(200);

});

//logs out a logged in user
const logout = asyncHandeler((req, res)=>{
    console.log("logout user");
});

//unsure
const validate = asyncHandeler((req, res)=>{
    console.log("validate user");
});

const genToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY,{
        issuer:'sfs_official_site',
        expiresIn:'10d'
    })
}
 

module.exports = {
    register,
    login,
    logout,
    validate
}
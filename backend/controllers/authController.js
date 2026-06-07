// deals with handling authentication of users and webtraffic

const asyncHandeler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const PendingUser = require("../models/pendingUserModel");
const User = require('../models/userModel');


//registers a new user to the system from the pending user section
const register = asyncHandeler(async (req, res)=>{
    console.log("register new user");

    var pendUser = await PendingUser.findOne({token:req.params.token});

    if(!pendUser){
        res.status(400);
        throw new Error("No pending user found");
    }

    var emailUser = await User.findOne({email: pendUser.email});
    if (emailUser) {
        await PendingUser.deleteOne({token:pendUser.token})
        res.status(500);
        throw new Error("Pending User has allready been verified");
    }

    const user = await User.create({
        username:pendUser.username,
        email:pendUser.email,
        passwordhash: pendUser.password,
        profile:{
            displayName:pendUser.displayName,
            bio:pendUser.bio,
            avatar:null
        },
        lastVisited:Date.now()
    });

    if(user){
        await PendingUser.deleteOne({token:pendUser.token})
        res.status(201).json({
            user:{
                id: user._id, 
                username: user.username, 
                email:user.email, 
                token:genToken(user._id)
            },
            message:"User Created"
        });
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
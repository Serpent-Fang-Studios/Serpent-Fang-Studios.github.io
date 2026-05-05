//anything that requires the current user auth/protection will have the req.user value

const asyncHandeler = require('express-async-handler');
const User = require('../models/userModel');

const getUserData = asyncHandeler(async (req, res)=>{
    console.log("get current user");
    const userData = await User.findById(req.User.id, {passwordhash: 0});

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.User.id} was found`});
        return;
    }

    res.status(200).json(userData);
});

const getUserDatabyID = asyncHandeler(async (req, res)=>{
    console.log("get user by id"+ req.params.id);
    const userData = await User.findById(req.params.id, {passwordhash: 0});

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.params.id} was found`});
        return;
    }

    res.status(200).json(userData);
});

//to do finish updated with put
const updateCurrentUserData = asyncHandeler(async (req, res)=>{
    console.log("update current user");
    const userData = await User.findById(req.User.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.User.id} was found`});
        return;
    }
});

//to do finish updated with put
const updateCurrentUserDatabyID = asyncHandeler(async (req, res)=>{
    console.log("update user by id"+ req.params.id);
    const userData = await User.findById(req.params.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.params.id} was found`});
        return;
    }
});

const deleteCurrentUserData = asyncHandeler(async (req, res)=>{
    console.log("delete current user");
    const userData = await User.findById(req.User.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.User.id} was found`});
        return;
    }

    await userData.deleteOne();

    res.status(200).json(userData);
});

const deleteCurrentUserDatabyID = asyncHandeler(async (req, res)=>{
    console.log("delete user by id:" + req.params.id);
    const userData = await User.findById(req.params.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.params.id} was found`});
        return;
    }

    await userData.deleteOne();

    res.status(200).json(userData);
});

module.exports = {
    getUserData, 
    getUserDatabyID,
    updateCurrentUserData,
    updateCurrentUserDatabyID,
    deleteCurrentUserData,
    deleteCurrentUserDatabyID
}
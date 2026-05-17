//anything that requires the current user auth/protection will have the req.user value

const asyncHandeler = require('express-async-handler');
const User = require('../models/userModel');

const getUserData = asyncHandeler(async (req, res)=>{
    console.log("get current user");
    const userData = await User.findById(req.user.id, {passwordhash: 0});

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.user.id} was found`});
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

const updateCurrentUserData = asyncHandeler(async (req, res)=>{
    console.log("update current user");
    const userData = await User.findById(req.user.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.user.id} was found`});
        return;
    }

    if(!req.body.changes){
        res.status(400).json({message:'no changes listed'});
        return;
    }

    if(req.body.changes.passwordhash){
        //TODO
        //if the password is attempted to be changed email user conformation
    }

    let response = await User.updateOne({_id: userData._id}, { $set: JSON.parse(req.body.changes) });
    console.log(response);
    res.status(200).json({message:`updated user ${userData._id}`});
});

const updateUserDatabyID = asyncHandeler(async (req, res)=>{
    console.log("update user by id"+ req.params.id);
    const userData = await User.findById(req.params.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.params.id} was found`});
        return;
    }

    if(!req.body.changes){
        res.status(400).json({message:'no changes listed'});
        return;
    }

    if(req.body.changes.passwordhash){
        //TODO
        //if the password is attempted to be changed email user conformation
    }

    console.log(req.body.changes);
    let response = await User.updateOne({_id: userData._id}, { $set: JSON.parse(req.body.changes) });
    console.log(response);
    res.status(200).json({message:`updated user ${userData._id}`});
});

const deleteCurrentUserData = asyncHandeler(async (req, res)=>{
    console.log("delete current user");
    const userData = await User.findById(req.user.id);

    if (!userData) {
        res.status(404).json({message:`no user with the id ${req.user.id} was found`});
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
    updateUserDatabyID,
    deleteCurrentUserData,
    deleteCurrentUserDatabyID
}
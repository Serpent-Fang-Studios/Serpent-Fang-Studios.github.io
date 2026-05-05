const express = require('express');

const router = express.Router();

router.post("/register", (req,res)=>{console.log("register new user"); res.status(200).end()});
router.post("/login", (req,res)=>{console.log("login user"); res.status(200).end()});
router.post("/logout", (req,res)=>{console.log("logout user"); res.status(200).end()});
router.post("/validate", (req,res)=>{console.log("validate user"); res.status(200).end()});

module.exports = router;
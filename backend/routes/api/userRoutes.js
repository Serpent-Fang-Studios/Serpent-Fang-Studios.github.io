const express = require('express');

const router = express.Router();

router.get("/user", (req,res)=>{console.log("get current user"); res.status(200).end()});
router.get("/:id/user", (req,res)=>{console.log("get user by id"+ req.params.id); res.status(200).end()});
router.patch("/update", (req,res)=>{console.log("update current user"); res.status(200).end()});
router.patch("/:id/update", (req,res)=>{console.log("update user by id"+ req.params.id); res.status(200).end()});
router.delete("/", (req,res)=>{console.log("delete current user"); res.status(200).end()});
router.delete("/:id/", (req,res)=>{console.log("delete user by id:" + req.params.id); res.status(200).end()});


module.exports = router;
const express = require('express');

const {
    verifyUserAdminStatus, verifyUserToken
} = require("../../middleware/accountAuthMiddleware")

const router = express.Router();

router.get("/", (req,res)=>{console.log("get posts"); res.status(200).end()})
router.patch("/:id", verifyUserToken, (req,res)=>{console.log("update post" + req.params.id); res.status(200).end()})
router.post("/", verifyUserToken, (req,res)=>{console.log("create post"); res.status(201).end()})
router.delete("/:id", verifyUserToken, (req,res)=>{console.log("delete report by id" + req.params.id); res.status(200).end()})




module.exports = router
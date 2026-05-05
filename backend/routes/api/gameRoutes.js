const express = require('express');

const router = express.Router();

router.get("/", (req,res)=>{console.log("get games"); res.status(200).end()});
router.get("/:id", (req,res)=>{console.log("get game by id" + req.params.id); res.status(200).end()});
router.post("/", (req,res)=>{console.log("create game"); res.status(201).end()});
router.put("/:id", (req,res)=>{console.log("update game") + req.params.id; res.status(200).end()});
router.patch("/:id", (req,res)=>{console.log("update game" + req.params.id); res.status(200).end()});
router.delete("/:id", (req,res)=>{console.log("delete game" + req.params.id); res.status(200).end()});
router.post("/:id/publish", (req,res)=>{console.log("publish the game"); res.status(200).end()});


module.exports = router;
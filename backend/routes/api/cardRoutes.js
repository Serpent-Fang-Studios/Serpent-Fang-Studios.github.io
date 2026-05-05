const express = require('express');

const router = express.Router();

router.get("/", (req,res)=>{console.log("get cards"); res.status(200).end()});
router.get("/:id", (req,res)=>{console.log("get card by id" + req.params.id); res.status(200).end()});
router.post("/", (req,res)=>{console.log("create card"); res.status(201).end()});
router.put("/:id", (req,res)=>{console.log("update card" + req.params.id); res.status(200).end()});
router.patch("/:id", (req,res)=>{console.log("update card" + req.params.id); res.status(200).end()});
router.delete("/:id", (req,res)=>{console.log("delete card" + req.params.id); res.status(200).end()});
router.post("/:id/publish", (req,res)=>{console.log("publish the card"); res.status(200).end()});


module.exports = router;
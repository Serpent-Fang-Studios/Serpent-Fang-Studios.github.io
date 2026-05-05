const express = require('express');

const router = express.Router();

router.get("/", (req,res)=>{console.log("get reports"); res.status(200).end()})
router.get("/:id", (req,res)=>{console.log("get report by id" + req.params.id); res.status(200).end()})
router.post("/", (req,res)=>{console.log("create report"); res.status(201).end()})
router.delete("/:id", (req,res)=>{console.log("delete report by id" + req.params.id); res.status(200).end()})




module.exports = router
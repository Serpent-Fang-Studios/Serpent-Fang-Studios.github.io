const express = require('express');
const {
    getUserData, 
    getUserDatabyID,
    updateCurrentUserData,
    updateCurrentUserDatabyID,
    deleteCurrentUserData,
    deleteCurrentUserDatabyID
} = require('../../controllers/userController');

const router = express.Router();

router.get("/user", getUserData);
router.get("/:id/user",getUserDatabyID);
router.patch("/update",updateCurrentUserData);
router.patch("/:id/update",updateCurrentUserDatabyID);
router.delete("/",deleteCurrentUserData);
router.delete("/:id/",deleteCurrentUserDatabyID);


module.exports = router;
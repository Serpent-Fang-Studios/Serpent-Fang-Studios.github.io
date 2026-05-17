const express = require('express');
const {
    getUserData, 
    getUserDatabyID,
    updateCurrentUserData,
    updateUserDatabyID,
    deleteCurrentUserData,
    deleteCurrentUserDatabyID
} = require('../../controllers/userController');

const {
    verifyUserAdminStatus, verifyUserToken
} = require("../../middleware/accountAuthMiddleware")

const router = express.Router();

router.get("/user",verifyUserToken, getUserData);
router.get("/:id/user",verifyUserToken, verifyUserAdminStatus, getUserDatabyID);
router.patch("/update",verifyUserToken, updateCurrentUserData);
router.patch("/:id/update",verifyUserToken, verifyUserAdminStatus, updateUserDatabyID);
router.delete("/",verifyUserToken, deleteCurrentUserData);
router.delete("/:id/",verifyUserToken, verifyUserAdminStatus, deleteCurrentUserDatabyID);


module.exports = router;
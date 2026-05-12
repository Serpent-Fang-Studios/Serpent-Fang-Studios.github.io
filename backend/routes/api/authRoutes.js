const express = require('express');

const {
    verifyUserAdminStatus, verifyUserToken
} = require("../../middleware/accountAuthMiddleware")

const router = express.Router();

const {
    register,
    login,
    logout,
    validate
} = require('../../controllers/authController');

router.post("/register", register);
router.post("/login", login);
router.post("/logout",verifyUserToken, logout);
router.post("/validate",verifyUserToken, validate);

module.exports = router;
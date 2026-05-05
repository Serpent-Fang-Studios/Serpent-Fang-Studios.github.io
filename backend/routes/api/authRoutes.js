const express = require('express');

const router = express.Router();

const {
    register,
    login,
    logout,
    validate
} = require('../../controllers/authController');

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/validate", validate);

module.exports = router;
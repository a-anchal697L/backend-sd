const express = require("express");
const router = express.Router();
const { register, login, verifyUser, logout } = require("../controllers/auth.controller.js");
const { registerValidation, loginValidation } = require("../utils/auth.js");
const authMiddleware = require("../middleware/auth.js");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/verify", authMiddleware, verifyUser);
router.get("/logout", authMiddleware, logout);

module.exports = router;

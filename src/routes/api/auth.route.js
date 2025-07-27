const express = require("express");

const authController = require("@/controllers/auth.controller");
const checkAuth = require("@/middlewares/checkAuth");
const authValidator = require("@/validators/auth.validator");

const router = express.Router();

router.post("/verify-email", authController.verifyEmail);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);
// Validator
router.post("/register", authValidator.register, authController.register);
router.post("/login", authValidator.login, authController.login);
// checkAuth
router.get("/me", checkAuth, authController.me);

module.exports = router;

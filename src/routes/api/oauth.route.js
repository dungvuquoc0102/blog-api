const express = require("express");

const oauthController = require("@/controllers/oauth.controller");
// const checkAuth = require("@/middlewares/checkAuth");
// const authValidator = require("@/validators/auth.validator");

const router = express.Router();

// router.post("/register", authValidator.register, authController.register);
// router.post("/verify-email", authController.verifyEmail);

router.post("/google-login", oauthController.googleLogin);
router.get("/github/callback", oauthController.githubCallback);

// router.post("/forgot-password", authController.forgotPassword);
// router.post("/verify-reset-password", authController.verifyResetPassword);
// router.post("/reset-password", authController.resetPassword);

// router.post("/refresh-token", authController.refreshToken);

// router.post("/logout", checkAuth, authController.logout);

// router.get("/me", checkAuth, authController.me);

module.exports = router;

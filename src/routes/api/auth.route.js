const express = require("express");
const authController = require("@/controllers/auth.controller");
const checkAuth = require("@/middlewares/checkAuth");
const {
  registerValidator,
  loginValidator,
  verifyEmailValidator,
} = require("@/validators/auth.validator");

const router = express.Router();

router.get("/me", checkAuth, authController.me);

router.post("/register", registerValidator, authController.register);
router.post("/verify-email", verifyEmailValidator, authController.verifyEmail);
router.post("/refresh", authController.refreshToken);
router.post("/login", loginValidator, authController.login);

module.exports = router;

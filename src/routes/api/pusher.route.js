const express = require("express");
const pusherController = require("@/controllers/pusher.controller");
const checkAuth = require("@/middlewares/checkAuth");

const router = express.Router();

router.post("/auth", pusherController.auth);

module.exports = router;

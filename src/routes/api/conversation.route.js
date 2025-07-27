const express = require("express");
const conversationsController = require("@/controllers/conversation.controller");
const checkAuth = require("@/middlewares/checkAuth");

const router = express.Router();

// checkAuth
router.get("/", checkAuth, conversationsController.index);
router.get("/:id", checkAuth, conversationsController.show);
router.post("/", checkAuth, conversationsController.store);
router.put("/:id", conversationsController.update);
router.patch("/:id", conversationsController.update);
router.delete("/:key", conversationsController.destroy);

module.exports = router;

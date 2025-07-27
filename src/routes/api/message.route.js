const express = require("express");
const messagesController = require("@/controllers/message.controller");
const checkAuth = require("@/middlewares/checkAuth");

const router = express.Router();

router.get("/", messagesController.index);
router.get("/:key", messagesController.show);
router.post("/send", checkAuth, messagesController.store);
router.put("/:key", messagesController.update);
router.patch("/:key", messagesController.update);
router.delete("/:key", messagesController.destroy);

module.exports = router;

const express = require("express");
const commentsController = require("@/controllers/comment.controller");
const checkAuth = require("@/middlewares/checkAuth");

const router = express.Router();

router.get("/", commentsController.index);
router.get("/:id", commentsController.show);
// checkAuth
router.post("/", checkAuth, commentsController.store);
router.put("/:id", checkAuth, commentsController.update);
router.patch("/:id", checkAuth, commentsController.update);
router.delete("/:id", checkAuth, commentsController.destroy);

module.exports = router;

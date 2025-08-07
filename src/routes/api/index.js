const express = require("express");

const authRouter = require("./auth.route");
const oauthRouter = require("./oauth.route");
const commentRouter = require("./comment.route");
const postRouter = require("./post.route");
const topicRouter = require("./topic.route");
const messageRouter = require("./message.route");
const conversationRouter = require("./conversation.route");
const pusherRouter = require("./pusher.route");
const checkAuth = require("@/middlewares/checkAuth");

const router = express.Router({ mergeParams: true });

router.use("/auth", authRouter);
router.use("/oauth", oauthRouter);
router.use("/topics", topicRouter);
router.use("/posts", postRouter);
router.use("/posts/:slug/comments", commentRouter);
router.use("/conversations", checkAuth, conversationRouter);
router.use("/messages", checkAuth, messageRouter);
router.use("/pusher", checkAuth, pusherRouter);

module.exports = router;

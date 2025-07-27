const express = require("express");
const topicsController = require("@/controllers/topic.controller");

const router = express.Router();

router.get("/", topicsController.index);
router.get("/:slug", topicsController.show);
router.post("/", topicsController.store);
router.put("/:slug", topicsController.update);
router.patch("/:slug", topicsController.update);
router.delete("/:slug", topicsController.destroy);

module.exports = router;

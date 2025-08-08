require("module-alias/register");
require("dotenv").config();
const express = require("express");

const router = require("@/routes/api");
const cors = require("cors");

const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorsHandler = require("@/middlewares/errorHandler");
const handlePagination = require("@/middlewares/handlePagination");
const stripForbiddenFields = require("@/middlewares/stripForbiddenFields");
const handleResponse = require("@/middlewares/handleResponse");
const pusher = require("@/utils/socket");

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(handlePagination);
app.use(
  stripForbiddenFields([
    "deleted_at",
    "deletedAt",
    "created_at",
    "createdAt",
    "updated_at",
    "updatedAt",
    "id",
  ])
);
app.use(handleResponse);

// Route
app.use("/api/v1", router);
// Message
app.post("/message/send", (req, res) => {
  pusher.trigger("K12", "new-message", {
    message: req.body.message,
  });
  res.status(200).json({
    message: "Success",
    data: JSON.stringify(req.body.message),
  });
});

// Error Handler
app.use(notFoundHandler);
app.use(errorsHandler);

const greenColor = "\x1b[32m";
app.listen(3000, () => {
  console.log(greenColor + "Server is running on port 3000..." + greenColor);
});

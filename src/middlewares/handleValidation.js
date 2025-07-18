const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  // Need refactoring
  res.status(400).json({
    message: "Bad request",
    errors: result.array(),
  });
};

module.exports = handleValidation;

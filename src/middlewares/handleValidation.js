const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.error(400, "Lỗi validate", { errors: result.array() });
};

module.exports = handleValidation;

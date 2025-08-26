const { validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array();

  const message = Array.isArray(errors) && errors[0]?.msg;

  res.error(400, message, errors);
};

module.exports = handleValidation;

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, TOKEN_TYPE } = require("@/config/auth");

/**
 * Generate access token for user
 * @param {number} userId - User ID
 * @returns {Object} Token object with access_token, token_type, expires_in
 */
exports.generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    accessToken: token,
    tokenType: TOKEN_TYPE,
    expiresIn: JWT_EXPIRES_IN,
  };
};

/**
 * Verify access token
 * @param {string} token - JWT token
 * @returns {Object} Decoded payload
 */
exports.verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

exports.generateVerificationToken = (userId) => {
  console.log(process.env.JWT_VERIFICATION_SECRET);
  console.log(parseInt(process.env.JWT_VERIFICATION_EXPIRES_IN));

  const token = jwt.sign({ userId }, process.env.JWT_VERIFICATION_SECRET, {
    expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRES_IN),
  });

  return {
    verifyToken: token,
    tokenType: TOKEN_TYPE,
    expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRES_IN),
  };
};

exports.verifyVerificationToken = (token) => {
  return jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
};

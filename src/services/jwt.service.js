const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, TOKEN_TYPE } = require("@/config/auth");

/**
 * Generate access token for user
 * @param {number} userId - User ID
 * @returns {Object} Token object with access_token, token_type, expires_in
 */
const generateAccessToken = (userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    return {
        access_token: token,
        token_type: TOKEN_TYPE,
        expires_in: JWT_EXPIRES_IN,
    };
};

/**
 * Verify access token
 * @param {string} token - JWT token
 * @returns {Object} Decoded payload
 */
const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateAccessToken,
    verifyAccessToken,
};

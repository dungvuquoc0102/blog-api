const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, TOKEN_TYPE } = require("@/config/auth");

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    accessToken: token,
    tokenType: TOKEN_TYPE,
    expiresIn: JWT_EXPIRES_IN,
  };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const generateVerificationToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_VERIFICATION_SECRET, {
    expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRES_IN),
  });

  return {
    verifyToken: token,
    tokenType: TOKEN_TYPE,
    expiresIn: parseInt(process.env.JWT_VERIFICATION_EXPIRES_IN),
  };
};

const verifyVerificationToken = (token) => {
  return jwt.verify(token, process.env.JWT_VERIFICATION_SECRET);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateVerificationToken,
  verifyVerificationToken,
};

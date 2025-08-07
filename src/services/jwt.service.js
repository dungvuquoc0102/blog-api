const jwt = require("jsonwebtoken");
const {
  ACCESS_JWT_SECRET,
  ACCESS_JWT_EXPIRES_IN,
  TOKEN_TYPE,
  VERIFYEMAIL_JWT_SECRET,
  VERIFYEMAIL_JWT_EXPIRES_IN,
  RESETPASSWORD_JWT_SECRET,
  RESETPASSWORD_JWT_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("@/config/auth");

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, ACCESS_JWT_SECRET, {
    expiresIn: ACCESS_JWT_EXPIRES_IN, // 5 minutes
  });

  return {
    accessToken: token,
    expiresIn: ACCESS_JWT_EXPIRES_IN,
    tokenType: TOKEN_TYPE,
  };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_JWT_SECRET);
};

const generateVerifyEmailToken = (userId) => {
  const token = jwt.sign({ userId }, VERIFYEMAIL_JWT_SECRET, {
    expiresIn: VERIFYEMAIL_JWT_EXPIRES_IN, // 12 hours
  });

  return {
    verifyEmailToken: token,
    expiresIn: VERIFYEMAIL_JWT_EXPIRES_IN,
    tokenType: TOKEN_TYPE,
  };
};

const verifyVerifyEmailToken = (token) => {
  return jwt.verify(token, VERIFYEMAIL_JWT_SECRET);
};

const generateResetPasswordToken = (userId) => {
  const token = jwt.sign({ userId }, RESETPASSWORD_JWT_SECRET, {
    expiresIn: RESETPASSWORD_JWT_EXPIRES_IN, // 5 minutes
  });

  return {
    resetPasswordToken: token,
    expiresIn: RESETPASSWORD_JWT_EXPIRES_IN,
    tokenType: TOKEN_TYPE,
  };
};

const verifyResetPasswordToken = (token) => {
  return jwt.verify(token, RESETPASSWORD_JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateVerifyEmailToken,
  verifyVerifyEmailToken,
  generateResetPasswordToken,
  verifyResetPasswordToken,
};

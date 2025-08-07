module.exports = {
  ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET || "d7f564efef40abcb",
  ACCESS_JWT_EXPIRES_IN: parseInt(process.env.ACCESS_JWT_EXPIRES_IN) || 300, // default: 5 minutes

  VERIFYEMAIL_JWT_SECRET:
    process.env.VERIFYEMAIL_JWT_SECRET || "2ee4a73d08342195",
  VERIFYEMAIL_JWT_EXPIRES_IN:
    parseInt(process.env.VERIFYEMAIL_JWT_EXPIRES_IN) || 300, // default: 5 minutes

  RESETPASSWORD_JWT_SECRET:
    process.env.RESETPASSWORD_JWT_SECRET || "b8e79dd695c58161",
  RESETPASSWORD_JWT_EXPIRES_IN:
    parseInt(process.env.RESETPASSWORD_JWT_EXPIRES_IN) || 300, // default: 5 minutes

  TOKEN_TYPE: process.env.TOKEN_TYPE || "Bearer",
  REFRESH_TOKEN_EXPIRES_IN:
    parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800, // default: 7 days
};

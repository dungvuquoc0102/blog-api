const jwtService = require("@/services/jwt.service");
const refreshTokenService = require("@/services/refreshToken.service");

module.exports = async (userId) => {
  const accessTokenData = jwtService.generateAccessToken(userId);
  const refreshToken = await refreshTokenService.create(userId);

  return {
    ...accessTokenData,
    refreshToken: refreshToken.token,
  };
};

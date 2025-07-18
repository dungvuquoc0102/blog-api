const { User } = require("@/models");
const { hash, compare } = require("@/utils/bcrypt");
const refreshTokenService = require("./refreshToken.service");
const jwtService = require("./jwt.service");
const queueService = require("./queue.service");

/**
 * Register new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Token data
 */
const register = async (email, password, firstName, lastName) => {
  try {
    const hashedPassword = await hash(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    queueService.dispatchQueue("sendVerifyEmail", { userId: user.id });

    const tokenData = jwtService.generateAccessToken(user.id);
    const refreshToken = await refreshTokenService.createRefreshToken(user.id);

    return {
      ...tokenData,
      refreshToken,
    };
  } catch (error) {
    console.error("Lỗi trong authService.register:", error);
    throw new Error("Đăng ký thất bại. Vui lòng thử lại sau.");
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Token data with refresh token
 * @throws {Error} If credentials are invalid
 */
const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Thông tin đăng nhập không hợp lệ.");
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("Thông tin đăng nhập không hợp lệ.");
  }

  const tokenData = jwtService.generateAccessToken(user.id);
  const refreshToken = await refreshTokenService.createRefreshToken(user.id);

  return {
    ...tokenData,
    refresh_token: refreshToken.token,
  };
};

/**
 * Refresh access token
 * @param {string} refreshTokenString - Refresh token
 * @returns {Object} New token data with new refresh token
 * @throws {Error} If refresh token is invalid
 */
const refreshAccessToken = async (refreshTokenString) => {
  const refreshToken = await refreshTokenService.findValidRefreshToken(
    refreshTokenString
  );
  if (!refreshToken) {
    throw new Error("Refresh token không hợp lệ");
  }

  const tokenData = jwtService.generateAccessToken(refreshToken.user_id);
  await refreshTokenService.deleteRefreshToken(refreshToken);

  const newRefreshToken = await refreshTokenService.createRefreshToken(
    refreshToken.user_id
  );

  return {
    ...tokenData,
    refresh_token: newRefreshToken.token,
  };
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};

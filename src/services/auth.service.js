const { User } = require("@/models");
const { hash, compare } = require("@/utils/bcrypt");
const jwtService = require("./jwt.service");
const refreshTokenService = require("./refreshToken.service");

/**
 * Register new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Token data
 */
const register = async (email, password) => {
    const user = await User.create({
        email,
        password: await hash(password),
    });

    return jwtService.generateAccessToken(user.id);
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

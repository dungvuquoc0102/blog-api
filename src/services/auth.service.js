const { User } = require("@/models");
const { hash, compare } = require("@/utils/bcrypt");
const refreshTokenService = require("./refreshToken.service");
const jwtService = require("./jwt.service");
const queueService = require("./queue.service");
const generateAuthToken = require("@/utils/generateAuthToken");
const createUsername = require("@/utils/createUsername");

const register = async (email, password, firstName, lastName) => {
  const username = await createUsername(firstName, lastName);
  const hashedPassword = await hash(password);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
  });

  queueService.dispatch("sendVerifyEmail", { userId: newUser.id });
};

const verifyEmail = async (tokenString) => {
  const payload = jwtService.verifyVerifyEmailToken(tokenString);

  if (!payload) {
    throw new Error("UNAUTHORIZED");
  }
  const user = await User.findByPk(payload.userId);

  if (user.verifiedAt) {
    throw new Error("CONFLICT");
  }
  await user.update({ verifiedAt: new Date() });

  const tokenData = await generateAuthToken(user.id);

  return tokenData;
};

const login = async (email, password, rememberMe) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !user.verifiedAt) {
    throw new Error("NOTVERIFIED");
  }
  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("UNAUTHORIZED");
  }

  const tokenData = await generateAuthToken(user.id);

  if (!rememberMe) {
    delete tokenData.refreshToken;
  }
  return tokenData;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  queueService.dispatch("sendResetPasswordEmail", { userId: user.id });
};

const verifyResetPassword = async (tokenString) => {
  const payload = jwtService.verifyResetPasswordToken(tokenString);
  if (!payload) {
    throw new Error("UNAUTHORIZED");
  }
};

const resetPassword = async (tokenString, newPassword) => {
  const payload = await jwtService.verifyResetPasswordToken(tokenString);
  if (!payload) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }

  const user = await User.findByPk(payload.userId);
  if (!user) throw new Error("Người dùng không tồn tại");

  const hashedPassword = await hash(newPassword);
  user.password = hashedPassword;
  await user.save();
};

const refreshAccessToken = async (tokenString) => {
  const refreshToken = await refreshTokenService.findValid(tokenString);
  if (!refreshToken) {
    throw new Error("UNAUTHORIZED");
  }

  await refreshTokenService.del(refreshToken.token);

  const newTokenData = await generateAuthToken(refreshToken.userId);

  return newTokenData;
};

const revokeToken = async (tokenString) => {
  await refreshTokenService.del(tokenString);
};

module.exports = {
  register,
  verifyEmail,
  forgotPassword,
  verifyResetPassword,
  resetPassword,
  login,
  refreshAccessToken,
  revokeToken,
};

const { User } = require("@/models");
const jwtService = require("@/services/jwt.service");
const loadEmail = require("./loadEmail");
const sendEmail = require("./sendEmail");

const generateHTML = async (userId, firstName) => {
  const tokenData = jwtService.generateResetPasswordToken(userId);
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/?token=${tokenData.resetPasswordToken}`;
  return await loadEmail("resetPasswordEmail", {
    resetUrl,
    expiresIn: tokenData.expiresIn,
    firstName,
  });
};

module.exports = async (payload) => {
  try {
    const userId = JSON.parse(payload)?.userId;
    if (!userId) {
      throw new Error("Lỗi khi gửi email reset mật khẩu");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Lỗi khi gửi email reset mật khẩu");
    }

    const html = await generateHTML(user.id, user.firstName);
    await sendEmail({
      to: user.email,
      subject: "Reset mật khẩu của bạn",
      html,
    });
  } catch (err) {
    console.error("Lỗi trong sendResetPasswordEmail:", err.message);
    throw new Error("Lỗi khi gửi email reset mật khẩu");
  }
};

const { User } = require("@/models");
const { generateVerificationToken } = require("@/services/jwt.service");
const loadEmail = require("./loadEmail");
const sendEmail = require("./sendEmail");

const generateHTML = async (userId, firstName) => {
  const verifyTokenObj = generateVerificationToken(userId);
  const verifyUrl = `${process.env.FRONTEND_URL}/reset-password/?token=${verifyTokenObj.verifyToken}`;
  return await loadEmail("resetPasswordEmail", {
    verifyUrl,
    expiresIn: verifyTokenObj.expiresIn,
    firstName,
  });
};

module.exports = async (payload) => {
  try {
    const userId =
      JSON.parse(payload)?.userId ??
      (() => {
        throw new Error("Lỗi khi gửi email reset mật khẩu");
      })();

    const user =
      (await User.findByPk(userId)) ||
      (() => {
        throw new Error("Lỗi khi gửi email reset mật khẩu");
      })();

    const html = await generateHTML(user.id, user.firstName);
    await sendEmail({
      to: user.email,
      subject: "Reset mật khẩu của bạn",
      html,
    });

    console.log(`Email reset mật khẩu đã được gửi tới ${user.email}`);
  } catch (err) {
    console.error("Lỗi trong sendResetPasswordEmail:", err.message);
    throw new Error("Lỗi khi gửi email reset mật khẩu");
  }
};

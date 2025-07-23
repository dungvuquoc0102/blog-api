const { User } = require("@/models");
const { generateVerificationToken } = require("@/services/jwt.service");
const loadEmail = require("./loadEmail");
const sendEmail = require("./sendEmail");

const generateHTML = async (userId, firstName) => {
  const verifyTokenObj = generateVerificationToken(userId);
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/confirm?token=${verifyTokenObj.verifyToken}`;
  return await loadEmail("verifyEmail", {
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
        throw new Error("Lỗi khi gửi email xác thực");
      })();

    const user =
      (await User.findByPk(userId)) ||
      (() => {
        throw new Error("Lỗi khi gửi email xác thực");
      })();

    const html = await generateHTML(user.id, user.firstName);
    await sendEmail({
      to: user.email,
      subject: "Xác thực địa chỉ email của bạn",
      html,
    });

    console.log(`Email xác thực đã được gửi tới ${user.email}`);
  } catch (err) {
    console.error("Lỗi trong sendVerifyEmail:", err.message);
    throw new Error("Lỗi khi gửi email xác thực");
  }
};

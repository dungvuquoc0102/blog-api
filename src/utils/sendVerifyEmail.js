const { User } = require("@/models");
const { generateVerificationToken } = require("@/services/jwt.service");
const loadEmail = require("./loadEmail");
const sendEmail = require("./sendEmail");

module.exports = async (payload) => {
  try {
    const { userId } = JSON.parse(payload);

    if (!userId) {
      console.error("Lỗi trong sendVerifyEmail với userId:", userId);
      throw new Error("Lỗi khi gửi email xác thực");
    }

    const user = await User.findByPk(userId);

    if (!user) {
      console.error("Lỗi trong sendVerifyEmail với user:", user);
      throw new Error("Lỗi khi gửi email xác thực");
    }

    const verifyTokenObj = generateVerificationToken(user.id);

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verifyTokenObj.verifyToken}`;
    const html = await loadEmail("verifyEmail", {
      verifyUrl,
      expiresIn: verifyTokenObj.expiresIn,
      firstName: user.firstName,
    });

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

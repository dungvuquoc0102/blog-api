const nodemailer = require("nodemailer");
const emailConfig = require("@/config/email");

const transporter = nodemailer.createTransport(emailConfig);

module.exports = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"No-Reply" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

const authService = require("@/services/auth.service");
const { User } = require("@/models");
const { dispatchQueue } = require("@/services/queue.service");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    await authService.register(email, password, firstName, lastName);

    res.success(
      null,
      `Đăng ký thành công. Vui lòng kiểm tra email (${email}) để xác thực tài khoản.`
    );
  } catch (error) {
    res.error(400, "Đăng ký thất bại", error.message);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const tokenData =
      (await authService.verifyToken(token)) ||
      (() => {
        throw new Error("Token không hợp lệ hoặc đã hết hạn");
      })();

    res.success(tokenData, "Xác thực email thành công");
  } catch (error) {
    console.error("Lỗi xảy ra ở authController:", error);
    res.error(400, "Xác thực email thất bại", error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const tokenData = await authService.login(email, password);

    if (!rememberMe) {
      delete tokenData.refreshToken;
    }

    res.success(tokenData, "Đăng nhập thành công");
  } catch (error) {
    res.error(400, "Đăng nhập thất bại", error.message);
  }
};

const me = async (req, res) => {
  res.success(req.user, "Lấy thông tin user thành công");
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await authService.revokeToken(refreshToken);
    }

    res.success(null, "Đăng xuất thành công");
  } catch (error) {
    res.error(400, "Đăng xuất thất bại", error.message);
  }
};

const refreshToken = async (req, res) => {
  try {
    const tokenData = await authService.refreshAccessToken(
      req.body.refresh_token
    );
    res.success(tokenData, "Reset accessToken thành công");
  } catch (error) {
    res.error(403, "Reset accessToken không thành công", error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.error(400, "Email không hợp lệ");
    }

    await dispatchQueue("sendForgotPasswordEmail", { userId: user.id });
    //continue...
  } catch (error) {
    res.error(
      400,
      "Gửi email để reset password không thành công",
      error.message
    );
  }
};
// bấm đăng ký -> gửi tk mật k
// Luồng: bấm quên mật khẩu -> sang trang nhập email -> gửi lên server để có email gửi token -> gửi email với link tới trang reset -> tại trang reset verify token rồi gửi lại mật khẩu

module.exports = { register, verifyEmail, login, me, logout, refreshToken };

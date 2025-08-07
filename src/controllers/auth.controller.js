const authService = require("@/services/auth.service");

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await authService.register(email, password, firstName, lastName);

    res.success(
      null,
      `Đăng ký thành công. Vui lòng kiểm tra email (${email}) để xác thực tài khoản.`,
      201
    );
  } catch (error) {
    res.error(400, "Đăng ký thất bại", error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token: tokenString } = req.body;
    const tokenData = await authService.verifyEmail(tokenString);

    res.success(tokenData, "Xác thực email thành công");
  } catch (error) {
    if (error.message === "CONFLICT") {
      return res.error(409, "Tài khoản đã được xác thực trước đó", error);
    }
    if (error.message === "UNAUTHORIZED") {
      return res.error(401, "Token không hợp lệ hoặc đã hết hạn", error);
    }

    res.error(400, "Xác thực email thất bại", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const tokenData = await authService.login(email, password, rememberMe);

    res.success(tokenData, "Đăng nhập thành công");
  } catch (error) {
    res.error(400, "Đăng nhập thất bại", error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    await authService.forgotPassword(email);

    res.success(null, `Vui lòng kiểm tra email (${email}) để đổi lại mật khẩu`);
  } catch (error) {
    res.error(400, "Quên mật khẩu thất bại", error);
  }
};

const verifyResetPassword = async (req, res) => {
  try {
    const { token: tokenString } = req.body;
    await authService.verifyResetPassword(tokenString);

    res.success(null, "Xác thực reset password thành công");
  } catch (error) {
    res.error(400, "Xác thực reset password thất bại", error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token: tokenString, password: newPassword } = req.body;
    await authService.resetPassword(tokenString, newPassword);

    res.success(null, "Reset password thành công");
  } catch (error) {
    res.error(400, "Reset password thất bại", error);
  }
};

const me = async (req, res) => {
  const userInfo = req.user;

  res.success(userInfo, "Lấy thông tin user thành công");
};

const logout = async (req, res) => {
  try {
    const { refreshToken: refreshTokenString } = req.body;
    await authService.revokeToken(refreshTokenString);

    res.success(null, "Đăng xuất thành công");
  } catch (error) {
    res.error(400, "Đăng xuất thất bại", error);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: refreshTokenString } = req.body;
    const newTokenData = await authService.refreshAccessToken(
      refreshTokenString
    );

    res.success(newTokenData, "RefreshToken thành công");
  } catch (error) {
    if (error.message === "UNAUTHORIZED") {
      res.error(401, "Token không hợp lệ hoặc đã hết hạn", error);
    }

    res.error(400, "RefreshToken thất bại", error);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  verifyResetPassword,
  resetPassword,
  me,
  logout,
  refreshToken,
};

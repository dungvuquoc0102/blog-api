const authService = require("@/services/auth.service");

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
    const { email, password } = req.body;

    const tokenData = await authService.login(email, password);
    res.success(tokenData, "Đăng nhập thành công");
  } catch (error) {
    res.error(400, "Đăng nhập thất bại", error.message);
  }
};

const me = async (req, res) => {
  response.success(res, 200, req.user);
};

const refreshToken = async (req, res) => {
  try {
    const tokenData = await authService.refreshAccessToken(
      req.body.refresh_token
    );
    response.success(res, 200, tokenData);
  } catch (error) {
    response.error(res, 403, error.message);
  }
};

module.exports = { register, verifyEmail, login, me, refreshToken };

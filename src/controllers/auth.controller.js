const authService = require("@/services/auth.service");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const tokenData = await authService.register(
      email,
      password,
      firstName,
      lastName
    );

    // check verifyAt for res token
    res.success(tokenData, "Đăng ký thành công");
  } catch (error) {
    res.error(400, "Đăng ký thất bại", error.message);
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

module.exports = { register, login, me, refreshToken };

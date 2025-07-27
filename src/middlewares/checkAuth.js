const jwtService = require("@/services/jwt.service");
const { User } = require("@/models");

module.exports = async function checkAuth(req, res, next) {
  try {
    const accessToken = req.headers?.authorization?.replace("Bearer ", "");
    if (!accessToken) {
      return res.error(401, "accessToken không được cung cấp");
    }

    const payload = jwtService.verifyAccessToken(accessToken);

    const user = await User.findOne({
      where: { id: payload.userId },
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "username",
        "avatar",
        "createdAt",
      ],
    });
    if (!user) {
      return res.error(401, "User không tồn tại");
    }

    req.user = user;
    next();
  } catch (error) {
    res.error(401, "accessToken không hợp lệ", error.message);
  }
};

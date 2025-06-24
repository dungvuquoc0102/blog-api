const { User } = require("@/models");
const response = require("@/utils/response");
const throwError = require("@/utils/throwError");
const { hash, compare } = require("@/utils/bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET =
    "835fb85dbd6a6e937479de267dccc88dc31c3b80757301a109d9d3b79427b783";

const register = async (req, res) => {
    const user = await User.create({
        email: req.body.email,
        password: await hash(req.body.password),
    });
    const expiresIn = 60 * 60;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: expiresIn,
    });

    response.success(res, 200, {
        access_token: token,
        token_type: "Bearer",
        expires_in: expiresIn,
    });
};

const login = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return response.success(res, 401, "Thông tin đăng nhập không hợp lệ.");
    }
    const isValid = await compare(req.body.password, user.password);
    if (!isValid) {
        return response.success(res, 401, "Thông tin đăng nhập không hợp lệ.");
    }

    const expiresIn = 60 * 60;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: expiresIn,
    });

    response.success(res, 200, {
        access_token: token,
        token_type: "Bearer",
        expires_in: expiresIn,
    });
};

module.exports = { register, login };

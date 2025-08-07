const { RefreshToken } = require("@/models");
const generateToken = require("@/utils/generateToken");
const { REFRESH_TOKEN_EXPIRES_IN } = require("@/config/auth");
const { Op } = require("sequelize");

const generateUniqueToken = async () => {
  let randToken = null;
  do {
    randToken = generateToken();
  } while (
    await RefreshToken.findOne({
      where: {
        token: randToken,
      },
    })
  );
  return randToken;
};

const create = async (userId) => {
  const token = await generateUniqueToken();

  const current = new Date();
  const expiredAt = new Date(
    current.getTime() + REFRESH_TOKEN_EXPIRES_IN * 1000
  );

  return await RefreshToken.create({
    userId,
    token,
    expiredAt,
  });
};

const findValid = async (token) => {
  const refreshToken = await RefreshToken.findOne({
    attributes: ["userId", "token"],
    where: {
      token: token,
      expired_at: {
        [Op.gte]: Date.now(),
      },
    },
  });

  return refreshToken;
};

const del = async (tokenString) => {
  await RefreshToken.destroy({
    where: {
      token: tokenString,
    },
  });
};

module.exports = {
  create,
  findValid,
  del,
};

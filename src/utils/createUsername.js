const { User } = require("@/models");
const generateToken = require("./generateToken");
const removeAccents = require("remove-accents");

module.exports = async (firstName, lastName) => {
  let isExist = false;
  let username;
  do {
    username =
      `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "") +
      generateToken(4);
    username = removeAccents(username);
    isExist = await User.findOne({
      where: {
        username,
      },
    });
  } while (isExist);

  return username;
};

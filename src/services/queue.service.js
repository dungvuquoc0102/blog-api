const { Queue } = require("@/models");

exports.dispatchQueue = async (type, payload) => {
  return await Queue.create({
    type,
    payload: JSON.stringify(payload),
  });
};

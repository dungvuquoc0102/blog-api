const { Queue } = require("@/models");

exports.dispatch = async (type, payload) => {
  return await Queue.create({
    type,
    payload: JSON.stringify(payload),
  });
};

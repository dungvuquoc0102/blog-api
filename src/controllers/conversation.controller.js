const conversationsService = require("@/services/conversation.service");

const index = async (req, res) => {
  const conversations = await conversationsService.getAll(req.user.id);
  res.success(conversations, "Lấy danh sách cuộc hội thoại thành công");
};

const show = async (req, res) => {
  const conversation = await conversationsService.getById(req.params.id);

  if (!conversation) throwError(404, "Not Found.");

  response.success(res, 200, conversation);
};

const store = async (req, res) => {};

const update = async (req, res) => {
  const conversation = await conversationsService.update(
    req.params.id,
    req.body
  );

  if (!conversation) throwError(404, "Not Found.");

  response.success(res, 201, conversation);
};

const destroy = async (req, res) => {
  const result = await conversationsService.remove(req.params.id);

  if (!result) throwError(404, "Not Found.");

  response.success(res, 204);
};

module.exports = { show, index, store, update, destroy };

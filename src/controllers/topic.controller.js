const topicService = require("@/services/topic.service");

const throwError = require("@/utils/throwError");

const index = async (req, res) => {
  const { page, limit } = req;
  const { items, total } = await topicService.getAll(page, limit);
  res.paginate({ items, total });
};

const show = async (req, res) => {
  const topic_name = req.params.topic_name;
  const topic = await topicService.getById(topic_name);

  if (!topic) throwError(404, "Not Found.");

  response.success(res, 200, topic);
};

const store = async (req, res) => {
  const topic = await topicService.create(req.body);
  response.success(res, 201, topic);
};

const update = async (req, res) => {
  const topic = await topicService.update(req.params.topic_name, req.body);

  if (!topic) throwError(404, "Not Found.");

  response.success(res, 201, topic);
};

const destroy = async (req, res) => {
  const result = await topicService.remove(req.params.topic_name);

  if (!result) throwError(404, "Not Found.");

  response.success(res, 204);
};

module.exports = { show, index, store, update, destroy };

const postsService = require("@/services/post.service");

const response = require("@/utils/response");
const throwError = require("@/utils/throwError");

const index = async (req, res) => {
  const { page, limit } = req;
  const { items, total } = await postsService.getAll(page, limit);
  res.paginate({ items, total });
};

const show = async (req, res) => {
  const post = await postsService.getByKey(req.params.key);
  if (!post) throwError(404, "Not Found.");

  response.success(res, 200, post);
};

const store = async (req, res) => {
  const post = await postsService.create(req.body);
  response.success(res, 201, post);
};

const update = async (req, res) => {
  const post = await postsService.update(req.params.key, req.body);

  if (!post) throwError(404, "Not Found.");

  response.success(res, 201, post);
};

const destroy = async (req, res) => {
  const result = await postsService.remove(req.params.key);

  if (!result) throwError(404, "Not Found.");

  response.success(res, 204);
};

module.exports = { show, index, store, update, destroy };

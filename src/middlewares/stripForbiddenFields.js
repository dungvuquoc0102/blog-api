module.exports = (forbiddenFields = []) => {
  return (req, res, next) => {
    forbiddenFields.forEach((field) => {
      if (req?.body?.hasOwnProperty(field)) {
        delete req.body[field];
      }
    });
    next();
  };
};

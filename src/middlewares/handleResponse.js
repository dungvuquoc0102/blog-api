module.exports = (req, res, next) => {
  res.success = (data, message = "Thành công", statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (
    statusCode = 500,
    message = "Lỗi không xác định",
    error = null
  ) => {
    console.log(error);
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  };

  res.paginate = (res, items, total, page, limit, statusCode = 200) => {
    const totalPages = Math.ceil(total / limit);

    return res.status(statusCode).json({
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  };

  next();
};

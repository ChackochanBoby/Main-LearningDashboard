const generalErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message || "Internal Server Error",
      status: statusCode,
    },
  });
};

const notFoundErrorHandler = (req, res, next) => {
  const notFoundError = new Error("Resource not found");
  notFoundError.status = 404;
  next(notFoundError);
};

module.exports = { generalErrorHandler,notFoundErrorHandler };

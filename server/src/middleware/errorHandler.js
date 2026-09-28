export function notFound(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} was not found`
    }
  });
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;

  res.status(status).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: status === 500 ? "Something went wrong on the server." : err.message
    }
  });
}

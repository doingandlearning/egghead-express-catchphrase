function errorHandling(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else {
    res.status(500);
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  }
}

module.exports = { errorHandling };

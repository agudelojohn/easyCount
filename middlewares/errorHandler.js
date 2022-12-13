function logErrors(err, res, res, next) {
  console.log(err);
  next(err);
}

function errorHandler(err, res, res, next) {
  res.status(500).json({ message: err.message, stack: err.stack });
}

function boomErrorHandler(err, res, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };

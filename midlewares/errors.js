const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = err.message;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = err.message;
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Данный email уже занят';
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

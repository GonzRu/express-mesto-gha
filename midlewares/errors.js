const { NODE_ENV } = process.env;

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  const response = {
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  };

  if (NODE_ENV === 'development') {
    response.description = err.message;
  }

  res
    .status(statusCode)
    .send(response);
};

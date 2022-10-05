const NotFoundError = require('../errors/not-found-error');

module.exports = (req, res, next) => {
  next(new NotFoundError('Endpoint not found'));
};

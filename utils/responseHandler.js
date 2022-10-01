const NotFoundError = require('../errors/not-found-error');

module.exports = (data, res) => {
  if (!data) {
    throw new NotFoundError('Object not found');
  }

  res.send(data);
};

const mongoose = require('mongoose');

module.exports = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ message: err.message });

    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: err.message });

    return;
  }

  res.status(500).send({ message: `Произошла ошибка: ${err}` });
};

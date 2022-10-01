const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const responseHandler = require('../utils/responseHandler');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => responseHandler(user, res))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: err.message });

        return;
      }

      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь',
    avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: err.message });

        return;
      }

      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports.getMe = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.update = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: err.message });

        return;
      }

      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const id = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: err.message });

        return;
      }

      res.status(500).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: 3600 }, // токен будет просрочен через час после создания
      );

      return res
        .cookie('jwt', token, { maxAge: 3600000, httpOnly: true })
        .send(user);
    })
    .catch(() => {
      res.status(401).send({ message: 'Неправильные почта или пароль' });
    });
};

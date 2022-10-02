const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { celebrate, Joi } = require('celebrate');
const User = require('../models/user');
const responseHandler = require('../utils/responseHandler');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => responseHandler(user, res))
    .catch(next);
};

module.exports.createUser = [
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
      name: Joi.string(),
      about: Joi.string(),
      avatar: Joi.string().uri(),
    }),
  }),
  (req, res, next) => {
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
      .catch(next);
  },
];

module.exports.getMe = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.update = (req, res, next) => {
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
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
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
    .catch(next);
};

module.exports.login = [
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  (req, res, next) => {
    const { email, password } = req.body;

    User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          'some-secret-key',
          { expiresIn: 3600 },
        );

        return res
        // .cookie('jwt', token, { maxAge: 3600000 * 7, httpOnly: true, sameSite: true })
          .send({ token });
      })
      .catch(next);
  },
];

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const responseHandler = require('../utils/responseHandler');
const { jwtSign } = require('../utils/jwt');
const EmailBusyError = require('../errors/email-busy-error');

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => responseHandler(user, res))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
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
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailBusyError());
        return;
      }

      next(err);
    });
};

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

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwtSign(user);

      return res
        // .cookie('jwt', token, { maxAge: 3600000 * 7, httpOnly: true, sameSite: true })
        .send({ token });
    })
    .catch(next);
};

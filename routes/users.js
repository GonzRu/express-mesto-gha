const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, update, updateAvatar, getMe,
} = require('../controllers/usres');

router.get('/users/me', getMe);
router.patch(
  '/users/me',
  celebrate({
    params: {
      id: Joi.string().length(24),
    },
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  update,
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  updateAvatar,
);
router.get('/users', getUsers);
router.get(
  '/users/:id',
  celebrate({
    params: {
      id: Joi.string().length(24),
    },
  }),
  getUser,
);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { linkValidator } = require('../utils/validators');

router.get('/cards', getCards);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(linkValidator),
    }),
  }),
  createCard,
);
router.delete(
  '/cards/:id',
  celebrate({
    params: {
      id: Joi.string().hex().length(24),
    },
  }),
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().hex().length(24),
    },
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().hex().length(24),
    },
  }),
  dislikeCard,
);

module.exports = router;

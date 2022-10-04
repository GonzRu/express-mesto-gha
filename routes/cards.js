const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(2).uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  createCard,
);
router.delete(
  '/cards/:id',
  celebrate({
    params: {
      id: Joi.string().length(24),
    },
  }),
  deleteCard,
);
router.put(
  '/cards/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().length(24),
    },
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string().length(24),
    },
  }),
  dislikeCard,
);

module.exports = router;

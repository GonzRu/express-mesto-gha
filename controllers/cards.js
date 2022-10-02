const { celebrate, Joi } = require('celebrate');
const Card = require('../models/card');
const responseHandler = require('../utils/responseHandler');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = [
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(2).uri({
        scheme: ['http', 'https'],
      }),
    }),
  }),
  (req, res, next) => {
    const userId = req.user._id;
    const { name, link } = req.body;

    Card.create({ name, link, owner: userId })
      .then((card) => res.send(card))
      .catch(next);
  },
];

module.exports.deleteCard = [
  celebrate({
    params: {
      id: Joi.string().length(24),
    },
  }),
  (req, res, next) => {
    const { id } = req.params;

    Card.findById(id)
      .then((card) => {
        if (!card) throw new NotFoundError();
        if (card.owner.toString() !== req.user._id) throw new ForbiddenError();

        return Card
          .remove(card)
          .then(() => card);
      })
      .then((user) => responseHandler(user, res))
      .catch(next);
  },
];

module.exports.likeCard = [
  celebrate({
    params: {
      cardId: Joi.string().length(24),
    },
  }),
  (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((user) => responseHandler(user, res))
      .catch(next);
  },
];

module.exports.dislikeCard = [
  celebrate({
    params: {
      cardId: Joi.string().length(24),
    },
  }),
  (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((user) => responseHandler(user, res))
      .catch(next);
  },
];

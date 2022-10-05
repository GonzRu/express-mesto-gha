const mongoose = require('mongoose');
const Card = require('../models/card');
const responseHandler = require('../utils/responseHandler');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-error');

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
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
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((user) => responseHandler(user, res))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((user) => responseHandler(user, res))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      next(new ValidationError(err.message));
    } else {
      next(err);
    }
  });

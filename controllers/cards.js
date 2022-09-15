const Card = require('../models/card');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then(cards => res.send(cards))
    .catch(err => errorHandler(err, res));
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const {name, link} = req.body;

  Card.create({name, link, owner: userId})
    .then(card => res.send(card))
    .catch(err => errorHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  const id = req.params.id;

  Card.findByIdAndRemove(id)
    .then(user => responseHandler(user, res))
    .catch(err => errorHandler(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true},
  )
    .then(user => responseHandler(user, res))
    .catch(err => errorHandler(err, res));
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true},
  )
    .then(user => responseHandler(user, res))
    .catch(err => errorHandler(err, res));
}

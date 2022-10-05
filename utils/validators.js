const validator = require('validator');

module.exports.linkRegExp = /(https|http):\/\/(www\.)?([a-zA-Z\d-]+)\.(\w{2,4})([\w\-._~:/?#[\]@!$&'()*+,;=]*)/;

module.exports.linkValidator = (value, helpers) => (validator.isURL(value)
  ? true
  : helpers.message('Imvalid link'));

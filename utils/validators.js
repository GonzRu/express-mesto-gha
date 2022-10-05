const validator = require('validator');

module.exports.linkRegExp = /(https|http):\/\/(www\.)?([a-zA-Z\d-]+)\.(\w{2,4})([\w\-._~:/?#[\]@!$&'()*+,;=]*)/;

module.exports.linkValidator = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message('Invalid link');
};

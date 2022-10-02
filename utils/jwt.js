const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function getJwtSecret() { return NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret'; }

module.exports.jwtSign = (user) => jwt.sign(
  { _id: user._id },
  getJwtSecret(),
  { expiresIn: 3600 },
);

module.exports.jwtVerify = (token) => jwt.verify(token, getJwtSecret());

const NotAuthorizedError = require('../errors/not-authorized-error');
const { jwtVerify } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwtVerify(token);
  } catch (err) {
    throw new NotAuthorizedError();
  }

  req.user = payload;

  return next();
};

const NotAuthorizedError = require('../errors/not-authorized-error');
const { jwtVerify } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError());
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwtVerify(token);
  } catch (err) {
    next(new NotAuthorizedError());
    return;
  }

  req.user = payload;

  next();
};

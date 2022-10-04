class NotAuthorizedError extends Error {
  constructor(message = 'Токен не передан или передан не в том формате') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizedError;

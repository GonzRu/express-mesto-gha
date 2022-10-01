class NotAuthorizedError extends Error {
  constructor() {
    super('Токен не передан или передан не в том формате');
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizedError;

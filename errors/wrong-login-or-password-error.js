class WrongLoginOrPasswordError extends Error {
  constructor() {
    super('Неправильные почта или пароль');
    this.statusCode = 401;
  }
}

module.exports = WrongLoginOrPasswordError;

class EmailBusyError extends Error {
  constructor(message = 'Данный email уже занят') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailBusyError;

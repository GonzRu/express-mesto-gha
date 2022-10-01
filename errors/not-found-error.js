class NotFoundError extends Error {
  constructor(message = 'Object not found') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

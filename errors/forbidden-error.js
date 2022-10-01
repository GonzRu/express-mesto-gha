class ForbiddenError extends Error {
  constructor() {
    super('Access forbidden');
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

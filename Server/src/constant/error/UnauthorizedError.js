export default class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'User is unauthorized');
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

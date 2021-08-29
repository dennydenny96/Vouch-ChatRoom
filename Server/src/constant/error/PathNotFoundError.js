export default class PathNotFoundError extends Error {
  constructor(message) {
    super(message || 'Path is not found');
    this.name = 'PathNotFoundError';
    this.statusCode = 404;
  }
}

import { message } from '../../constant';
import { PathNotFoundError } from '../../constant/error';

const root = (req, res) => {
  res.send(message.WELCOME);
};

const notFound = (req, res, next) => {
  console.log(`${req.ip} tried to access ${req.originalUrl}`);
  next(new PathNotFoundError());
};

const errorHandler = (error, req, res, next) => {
  console.error(`Global error handler: ${error}`);

  const httpStatusCode = error.statusCode || 500;
  res.status(httpStatusCode).json({ [error.name]: error.message });
  next();
};

export default { root, notFound, errorHandler };

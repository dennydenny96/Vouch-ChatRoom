import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import routes from '../routes';

export default async ({ app }) => {
  // Settings
  app.enable('trust proxy');

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan('tiny'));

  // Static files
  app.use(express.static(path.join(__dirname, '../static')));

  // Routes
  app.use('/auth', routes.auth);
  app.use('/status', routes.status);
  app.use('/user', routes.user);
  app.use('/room', routes.room);
  app.use('/test', routes.test);
  app.get('/', routes.main.root);
  app.use(routes.main.notFound);
  app.use(routes.main.errorHandler);
  
  return app;
};

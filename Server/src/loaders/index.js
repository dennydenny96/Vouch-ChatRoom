import 'dotenv/config';
import expressLoader from './express';
import mongooseLoader from './mongoose';

const init = async ({ expressApp, serverApp }) => {
  await mongooseLoader();
  console.log('MongoDB Initialized');

  await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  // More loaders can be initialized here
};

export default { init };

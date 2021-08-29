import mongoose from 'mongoose';
import models from '../models';
import { cryptoUtil } from '../util';

const eraseDatabaseOnSync = (process.env.RESET_DB && process.env.RESET_DB === 'true') || false;

const seedUser = async () => {
  const user = new models.User({
    username: 'denny',
    type: 'admin',
  });

  const user2 = new models.User({
    username: 'joel',
    type: 'client',
  });

  await models.User.create([user, user2]);

  const room = new models.Room({
    roomId: 1,
    active: false
  });

  const room2 = new models.Room({
    roomId: 2,
    active: false
  });

  await models.Room.create([room, room2]);
};

const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
const connectDb = () => mongoose.connect(process.env.DATABASE_URL, dbOption);

export default async () => {
  await connectDb();

  if (eraseDatabaseOnSync) {
    console.log('Database will be refreshed with seed data');
    await Promise.all([models.User.deleteMany({}), models.Room.deleteMany({})]);
    await seedUser();
  }
};

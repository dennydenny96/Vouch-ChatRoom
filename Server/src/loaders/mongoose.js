import mongoose from 'mongoose';
import models from '../models';
import { cryptoUtil } from '../util';
// var mongoose = require('mongoose');
// var newId = new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca');
// // or leave the id string blank to generate an id with a new hex identifier
// var newId2 = new mongoose.mongo.ObjectId();

// var newid = mongoose.mongo.ObjectId('')
// var test = mongoose.Types.ObjectId()

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

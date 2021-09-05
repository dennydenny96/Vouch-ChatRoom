import { userConstant } from '../../constant';
import models from '../../models';
import { cryptoUtil } from '../../util';
import mongoose from 'mongoose';

const findUsers = async () => models.User.find().select({ password: 0 });

const findUser = async (id) => models.User.findById(id).select({ password: 0 });

const findUserByUsername = async (username) => models.User.findOne({ username });

const findUserRoom = async (room) => models.User.findOne({ room });

// const createUser = async (user) => {
//   const createdUser = await models.User.create(user);
//   const { password, ...userWithoutPassword } = createdUser._doc;
//   return userWithoutPassword;
// };

const createUser = async (username) => await models.User.create(username);
// const createRoom = async (roomParamSchema) => await models.Room.create(roomParamSchema);

const isAdmin = (user) => user.type === userConstant.UserType.Admin;
const isClient = (user) => user.type === userConstant.UserType.Client;

const userService = {
  createUser,
  findUsers,
  findUser,
  findUserByUsername,
  findUserRoom,
  isAdmin,
  isClient
};

export default userService;

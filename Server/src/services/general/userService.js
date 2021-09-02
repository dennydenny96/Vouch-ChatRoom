import { userConstant } from '../../constant';
import models from '../../models';
import { cryptoUtil } from '../../util';

const findUsers = async () => models.User.find().select({ password: 0 });

const findUser = async (id) => models.User.findById(id).select({ password: 0 });

const findUserByUsername = async (username) => models.User.findOne({ username });

// const createUser = async (user) => {
//   user.password = await cryptoUtil.hash(user.password);
//   const createdUser = await models.User.create(user);
//   const { password, ...userWithoutPassword } = createdUser._doc;
//   return userWithoutPassword;
// };

// const updateUser = async (user) => {
//   const selector = { _id: user._id };
//   const option = { new: true };
//   const updatedUser = await models.User.findOneAndUpdate(selector, user, option);
//   return updatedUser;
// };

// const deleteUser = async (id) => {
//   const deletedUser = await models.User.findByIdAndDelete(id);
//   return deletedUser;
// };

const isAdmin = (user) => user.type === userConstant.UserType.Admin;
const isClient = (user) => user.type === userConstant.UserType.Client;

const userService = {
  findUsers,
  findUser,
  findUserByUsername,
  // createUser,
  // updateUser,
  // deleteUser,
  isAdmin,
  isClient,
};

export default userService;

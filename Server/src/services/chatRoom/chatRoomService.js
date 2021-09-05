import { userConstant } from '../../constant';
import models from '../../models';
import { cryptoUtil } from '../../util';
import mongoose from 'mongoose';
import userService from '../general/userService';
import roomService from '../general/roomService';
import messageService from '../general/messageService';

const getUsersInRoom = async (room) => await roomService.findRoomByRoom(room);

const getMessagesInRoom = async (roomId) => await messageService.findMessageByRoomId(roomId);

const addUser = async ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const paramUser = { name, clientId: id };

  const existingUser = await userService.findUserByUsername(name)
  // if (!existingUser) return { error: 'Username is not registered.' };
  if (!existingUser) {
    await userService.createUser({ username: name })
  };

  const existingRoom = await roomService.findRoomByRoom(room);
  if (existingRoom) {
    const isAlreadyInRoom = existingRoom.users.find((user) => user.name === paramUser.name);
    if (isAlreadyInRoom) return { error: 'Username is already in room.' };
    else {
      const selector = { room };
      const method = { $push: { users: paramUser } };
      const roomCollection = await roomService.updateRoom(selector, method, { new: true });
      return { roomCollection };
    }
  }
  else if (!existingRoom) {
    const roomParamSchema = { clientId: id, room, users: [paramUser] };
    const roomCollection = await roomService.createRoom(roomParamSchema);
    const messageParamSchema = {
      roomId: mongoose.Types.ObjectId(roomCollection._id),
      clientId: id
    }
    const messageCollection = await messageService.createMessage(messageParamSchema)
    return { roomCollection };
  }
}

const sendMessageInRoom = ({ text, name, roomObjId }) => {
  const selector = { roomId: roomObjId };
  const method = { $push: { messages: { name, text } } };
  const messageCollection = messageService.updateMessage(selector, method, { new: true });
  return { messageCollection }
}

const removeUser = async (id) => {
  const selector = { "users.clientId": id };
  const method = { $pull: { users: { clientId: id } } };
  const roomRemoveUser = await roomService.updateRoom(selector, method, { new: false });
  if (!roomRemoveUser) {
    return null
  }
  const userDetail = roomRemoveUser.users.find((user) => user.clientId === id);
  const payload = {
    room: roomRemoveUser.room,
    name: userDetail.name
  };

  return payload
}


const chatRoomService = {
  addUser,
  getUsersInRoom,
  getMessagesInRoom,
  sendMessageInRoom,
  removeUser
};

export default chatRoomService;
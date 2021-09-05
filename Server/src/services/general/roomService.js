import models from '../../models';

const findRoomByRoom = async (room) => models.Room.findOne({ room });

const findUserInRoomByClientId = async (clientId) => models.Room.findOne({ "users.clientId": clientId });

const createRoom = async (roomParamSchema) => await models.Room.create(roomParamSchema);

const updateRoom = async (selector, method, isNew = { new: true }) => await models.Room.findOneAndUpdate(selector, method, isNew)

const roomService = {
  findRoomByRoom,
  findUserInRoomByClientId,
  createRoom, updateRoom,
};

export default roomService;

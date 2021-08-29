import models from '../../models';

const findRoomByRoomId = async (roomId) => models.Room.findOne({ roomId });

const roomService = {
  findRoomByRoomId
};

export default roomService;

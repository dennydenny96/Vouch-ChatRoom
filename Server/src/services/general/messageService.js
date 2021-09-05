import models from '../../models';

const findMessageByRoomId = async (roomId) => models.Message.findOne({ roomId });

const createMessage = async (messageParamSchema) => await models.Message.create(messageParamSchema);

const updateMessage = async (selector, method, isNew = { new: true }) => models.Message.findOneAndUpdate(selector, method, isNew);

const messageService = {
  createMessage,
  updateMessage,
  findMessageByRoomId
};

export default messageService;

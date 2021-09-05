import mongoose from 'mongoose';

const messageCollectionName = 'message';

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    clientId: { type: String, required: true, unique: true },
    messages: [{
      name: { type: String },
      text: { type: String }
    }]
  },
  { timestamps: true }
);

const Message = mongoose.model(messageCollectionName, messageSchema);

export { messageCollectionName };
export default Message;

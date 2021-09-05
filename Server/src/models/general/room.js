import mongoose from 'mongoose';

const roomCollectionName = 'room';

const roomSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, unique: true },
    room: { type: String, required: true, unique: true },
    users: [{
      clientId: { type: String },
      name: { type: String }
    }]
  },
  { timestamps: true }
);

const Room = mongoose.model(roomCollectionName, roomSchema);

export { roomCollectionName };
export default Room;

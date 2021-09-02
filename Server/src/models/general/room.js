import mongoose from 'mongoose';

const roomCollectionName = 'room';

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const Room = mongoose.model(roomCollectionName, roomSchema);

export { roomCollectionName };
export default Room;

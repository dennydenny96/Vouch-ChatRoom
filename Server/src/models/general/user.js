import mongoose from 'mongoose';

const userCollectionName = 'user';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model(userCollectionName, userSchema);

export { userCollectionName };
export default User;

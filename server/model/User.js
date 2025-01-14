import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Games: {
    type: Number,
    default: 0,
  },
  Balance: {
    type: Number,
    default: 100,
  },
  Win: {
    type: Number,
    default: 0,
  },
  Loss: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model('User', userSchema);

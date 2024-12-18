import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  Username: String,
  Name: String,
  Email: String,
  Games: Number,
  Money: Number,
  Win: Number,
  Loss: Number,
});

export default model('User', userSchema);

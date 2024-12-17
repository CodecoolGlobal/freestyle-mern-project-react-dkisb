import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cardSchema = new Schema({
    color: String,
    name: String,
    value: Number,
    frontImage: String,
    backImage: String
});

export default model('Card', cardSchema);
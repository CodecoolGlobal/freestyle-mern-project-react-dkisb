import express from 'express';
import mongoose from 'mongoose';
import Card from './model/Card.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const dbUser = process.env.DB_UN;
const dbPassword = process.env.DB.PW;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jeldi.mongodb.net/twenty-one-project`);


async function createCard(color, name, value, frontImage) {
    try {
        const card = await Card.create({
        color: color,
        name: name,
        value: value,
        frontImage: frontImage,
        backImage: './pictures/Back.jpg'
        });
    } catch (error) {
        console.error(error);
    }
}
async function findAll() {
    const cards = await Card.find();
    console.log(cards);
}
findAll()


app.listen(3000, () => console.log('Server started on http://localhost:3000/'));

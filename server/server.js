import express from 'express';
import mongoose from 'mongoose';
import Card from './model/Card.js';
import User from './model/User.js';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';
dotenv.config();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '/pictures')));

const dbUser = process.env.DB_UN;
const dbPassword = process.env.DB_PW;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jeldi.mongodb.net/twenty-one-project`);

async function createCard(color, name, value, frontImage) {
  try {
    const card = await Card.create({
      color: color,
      name: name,
      value: value,
      frontImage: frontImage,
      backImage: './Back.jpg',
    });
  } catch (error) {
    console.error(error);
  }
}

async function listAllIds() {
  const cards = await Card.find();
  const ids = cards.map((card) => card._id.toString());
  return ids;
}

async function createUser() {
  try {
    const user = await User.create({
      Username,
      Name,
      Email,
      Games,
      Money,
      Win,
      Loss,
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
}

async function updateUser(id, money, games, win, loss) {
  try {
    const user = await User.findByIdAndUpdate(id);
    user.Money = money;
    user.Games = games;
    user.Win = win;
    user.Loss = loss;
  } catch (error) {
    console.error(error);
  }
  User.save();
}

app.get('/api/cards', async (req, res, next) => {
  try {
    const cardIds = await getRandomDeck();
    res.send(cardIds);
  } catch (error) {
    next(error);
  }

});
app.get('/api/cards/:id', async (req, res) => {
  const id = req.params.id;
  const card = await Card.findById(id);
  res.send(card);
});

async function getRandomDeck() {
  const deck = await listAllIds();
  const randomDeck = [];
  for (let i = 0; i < 32; i++) {
    const randomNumber = Math.floor(Math.random() * deck.length);
    randomDeck.push(deck[randomNumber]);
    deck.splice(randomNumber, 1);
  }
  return randomDeck;
}

app.listen(3000, () => console.log('Server started on http://localhost:3000/'));

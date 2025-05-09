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

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

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

async function listAllIds() {
  const cards = await Card.find();
  const ids = cards.map((card) => card._id.toString());
  return ids;
}

async function createUser(name, password) {
  try {
    const user = await User.create({
      Username: name,
      Password: password,
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function checkUsernameExist(username) {
  const hit = await User.find({ Username: username });
  if (hit.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function checkLogin(name, password) {
  const hit = await User.find({ Username: name, Password: password });
  if (hit.length === 1) {
    return hit[0];
  } else {
    return false;
  }
}

app.get('/api/cards', async (req, res, next) => {
  try {
    const cardIds = await getRandomDeck();
    res.send(cardIds);
  } catch (error) {
    return next(error);
  }
});

app.get('/api/cards/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const card = await Card.findById(id);
    res.send(card);
  } catch (error) {
    next(error);
  }
});

app.post('/api/users/registration/', async (req, res, next) => {
  try {
    const name = req.body.username;
    const password = req.body.password;
    const isExist = await checkUsernameExist(name);
    if (isExist) {
      return res.json('The username already exists');
    } else {
      const newUser = await createUser(name, password);
      console.log(newUser);
      return res.json(newUser);
    }
  } catch (error) {
    return next(error);
  }
});

app.post('/api/users/login/', async (req, res, next) => {
  const name = req.body.username;
  const password = req.body.password;
  try {
    const validLogin = await checkLogin(name, password);
    if (validLogin) {
      return res.json(validLogin);
    } else {
      return res.json('Invalid login');
    }
  } catch (error) {
    return next(error);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Username, Password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { Username, Password }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/user/:id', async (req, res, next) => {
  const comingData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      Balance: comingData.Balance,
      Games: comingData.Games,
      Win: comingData.Win,
      Loss: comingData.Loss,
    });
    updatedUser.save();
    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});
app.listen(3000, () => console.log('Server started on http://localhost:3000/'));

import mongoose from 'mongoose';
import Card from './model/Card.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const suits = [
  { name: 'Acorn', short: 'acorn', color: 'Black' },
  { name: 'Bell', short: 'bell', color: 'Yellow' },
  { name: 'Heart', short: 'heart', color: 'Red' },
  { name: 'Leaf', short: 'leaf', color: 'Green' },
];
const ranks = [
  { name: 'Unter', short: 'unter', value: 2 },
  { name: 'Ober', short: 'ober', value: 3 },
  { name: 'King', short: 'king', value: 4 },
  { name: 'Seven', short: 'seven', value: 7 },
  { name: 'Eight', short: 'eight', value: 8 },
  { name: 'Nine', short: 'nine', value: 9 },
  { name: 'Ten', short: 'ten', value: 10 },
  { name: 'Ace', short: 'ace', value: 11 },
];
const imagePrefixes = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
];

async function createCards() {
  try {
    await Card.deleteMany({});
    console.log('Cleared existing cards');

    let prefixIndex = 0;
    for (const suit of suits) {
      for (const rank of ranks) {
        const frontImage = `./pictures/${imagePrefixes[prefixIndex]}${suit.short}-${rank.short}.jpg`;
        await Card.create({
          color: suit.color,
          name: `${rank.name} of ${suit.name}`,
          value: rank.value,
          frontImage: frontImage,
          backImage: './pictures/Back.jpg',
        });
        console.log(`Created ${rank.name} of ${suit.name} with image ${frontImage}`);
        prefixIndex++;
      }
    }
    console.log('All Huszonegy cards created successfully');
  } catch (error) {
    console.error('Error creating cards:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}
createCards();

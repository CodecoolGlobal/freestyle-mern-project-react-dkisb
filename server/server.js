import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// mongoose.connect('');

app.listen(3000, () => console.log('Server started on http://localhost:3000/'));

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/userRoute.js';
import multer from 'multer';
import path from 'path';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const mongodbURL = process.env.MONGODB_URL;

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    console.log("helllo");
    console.log("snhfu");
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/images', express.static('I:/Blocknote/documate/Backend/images'));

app.use(cors());
app.use(bodyParser.json());

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});



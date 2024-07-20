import express from 'express';
import auth from './routes/auth.route.js';
import user from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config'
import Run from './AI/gemini.js';

import UserMeal from './modals/userMeal.js'


let api_key = process.env.GPT_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Testing

import OpenAI from "openai";
const openai = new OpenAI();
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};


const port = process.env.PORT || 3000;



app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


// Http server
// Error Handling 

app.listen(port, (req, res) => {
  console.log('Server is running on port 3000');
});

app.get('/api', (req, res) => {
  res.send('Working fine');
});

app.use('/api/user', user);
app.use('/api/auth', auth);


// Testing

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Use the file's fieldname, a timestamp, and the original extension
  }
});
const upload = multer({ storage: storage });


app.post('/api/gemini', upload.single('image'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const imagePath = req.file.path;
    let data = await Run(imagePath);
    data = JSON.parse(data);

        let user = req.cookies.user;
        user = await JSON.parse(user);
        data.user = user;
        let userMeal = new UserMeal( data );
        await userMeal.save();
        res.status(200).send(data);
  }
  catch (e) {
    console.log(e);
    res.status(400).send("Error in generating response");
  }
});





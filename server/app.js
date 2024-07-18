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


let api_key=process.env.GPT_KEY;
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
app.listen(port, (req, res) => {
  console.log('Server is running on port 3000');
})

app.get('/api', (req, res) => {
  res.send('Working fine');
});

app.use('/api/user',user);
app.use('/api/auth', auth);




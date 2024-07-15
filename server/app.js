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



// Testing route
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
});

const upload = multer({ storage: storage,
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 1024 * 1024 * 5 // Max field value size in bytes (5MB in this example)
  }
 });


const encodeImage = (imagePath) => {
  const imageData = fs.readFileSync(imagePath);
  return Buffer.from(imageData).toString('base64');
};

// Path to your image
const imagePath = path.join(__dirname, './uploads/food.jpeg');

// Getting the base64 string

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${api_key}`
};

app.post('/api/findcalorie', upload.single('image'),(req, res) => {
  // const base64Image = encodeImage(imagePath);
  // console.log(base64Image.slice(0,10));
  async function main() {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: {"type":"json_object"},
      messages: [
        {
          role: "system",
          content: [
            { type: "text", text: "You are a dietition. A user sends you an image of a meal and you tell them how many calories are in it. Use the following JSON format:{name:food item name,calorie:calorie in food item,protien:protien in food item:carbs:carbs in food item} " },
            {
              type: "image_url",
              image_url: {
                "url": `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvY3PAUaMlZAqSaLFG1L-4K8cRFoftNIF5-Q&s`,
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);
  }
  main();
  res.send('Working fine');

});
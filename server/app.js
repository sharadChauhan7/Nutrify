import express from 'express';
import auth from './routes/auth.route.js';
import user from './routes/user.route.js';
import dite from './routes/diet.route.js';
import calorie from './routes/calorie.route.js';
import review from './routes/review.route.js'
import dashboard from './routes/dashboard.route.js';
import userChats from './routes/userChats.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import 'dotenv/config'

const app = express();
import path from 'path';
import { set } from 'mongoose';

const _dirname = path.dirname("");

// const buildpath = path.join(_dirname , "../client/dist")
// app.use(express.static(buildpath))


// const __filename = fileURLToPath(import.meta.url);
// Testing


const corsOptions = {
  origin: ['http://localhost:5173','https://healthyai.netlify.app','http://192.168.1.13:5173'],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};


const port = process.env.PORT || 3000;



app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json({ limit: '50mb' }));


// Http server
// Error Handling 

app.listen(port, (req, res) => {
  console.log('Server is running on port 3000');
});

app.get('/api', (req, res) => {
  console.log('Request to /api');
  res.send('Hello from the server');
});

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/calorie', calorie);
app.use('/api/diet',dite);
app.use('/api/review',review);
app.use('/api/dashboard',dashboard);
app.use('/api/userChats',userChats);
// Error Handaling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});




// Testing

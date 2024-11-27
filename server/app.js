import express from 'express';
import auth from './routes/auth.route.js';
import user from './routes/user.route.js';
import dite from './routes/diet.route.js';
import calorie from './routes/calorie.route.js';
import review from './routes/review.route.js'
import dashboard from './routes/dashboard.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import 'dotenv/config'

const app = express();
import path from 'path';

const _dirname = path.dirname("");

// const buildpath = path.join(_dirname , "../client/dist")
// app.use(express.static(buildpath))


// const __filename = fileURLToPath(import.meta.url);
// Testing


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
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json({ limit: '50mb' }));


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
app.use('/api/calorie', calorie);
app.use('/api/diet',dite);
app.use('/api/review',review);
app.use('/api/dashboard',dashboard);


// Testing

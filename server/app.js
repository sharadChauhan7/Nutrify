import express from 'express';
import auth from './routes/auth.route.js';
import user from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


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
app.use(cookieParser())


// Http server
app.listen(port, (req, res) => {
  console.log('Server is running on port 3000');
})

app.get('/api', (req, res) => {
  res.send('Working fine');
});

app.use('/api/user',user);
app.use('/api/auth', auth);

import express from 'express';
import {isLogin} from '../middlewares/middleware.js'
import {getCalories,getuserMeals,getuserMealsToday} from '../controllers/calorie.controller.js'
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const router = express({mergeParams:true});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Specify the directory to store files
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Use the file's fieldname, a timestamp, and the original extension
    }
  });
  const upload = multer({ storage: storage });

router.post('/getCalories',isLogin, upload.single('image'),getCalories);
router.route('/getMeals/:id').get(isLogin,getuserMeals);
router.route('/getMeals/today').get(isLogin,getuserMealsToday);

export default router;
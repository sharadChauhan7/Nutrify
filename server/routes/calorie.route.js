import express from 'express';
import {isLogin} from '../middlewares/middleware.js'
import {getCalories,getuserMeals,getuserMealsToday} from '../controllers/calorie.controller.js'
import multer from 'multer';
import {deleteMeal} from '../controllers/calorie.controller.js'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const router = express({mergeParams:true});


import {storage} from '../util/cloudinary.js'
// console.log(storage);
const upload = multer({storage});

router.post('/getCalories',isLogin, upload.single('image'),getCalories);
router.route('/getMeals').get(isLogin,getuserMeals);
router.route('/getMeals/today').get(isLogin,getuserMealsToday);
router.route('/:id/meals/:mealId').delete(isLogin,deleteMeal);

export default router;
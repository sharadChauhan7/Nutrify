import express from 'express';
import {setUserStatus,getUserStatus,updateUser,updateStatus,getuserMeals} from '../controllers/user.controller.js';
import {isLogin} from '../middlewares/middleware.js'
const router = express();


router.route('/status').get(isLogin,getUserStatus).post(setUserStatus);
router.route('/edit').post(updateUser);
router.route('/editStatus').post(updateStatus);
router.route('/getMeals').get(getuserMeals);
export default router;
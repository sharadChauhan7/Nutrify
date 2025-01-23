import express from "express"
// import { createDite, getDites, getDiteById, updateDite, deleteDite } from "../controllers/dite.controller.js"
import {getUserWeight, updateUserWeight} from '../controllers/dashboard.controller.js'
import {isLogin} from '../middlewares/middleware.js'


const router = express.Router();

router.post('/updateUserWeight',isLogin,updateUserWeight);
router.get('/',isLogin,getUserWeight);

export default router;
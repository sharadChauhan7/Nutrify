import express from "express"
// import { createDite, getDites, getDiteById, updateDite, deleteDite } from "../controllers/dite.controller.js"
import {generateDiet,getDiet,generateAlternate,updateDiet} from '../controllers/diet.controller.js'
import {isLogin} from '../middlewares/middleware.js'

const router = express.Router({mergeParams:true});

router.get('/generate',isLogin,generateDiet);
router.get('/',isLogin,getDiet);
router.post('/alternate',isLogin,generateAlternate);
router.patch('/update',isLogin,updateDiet);

export default router;
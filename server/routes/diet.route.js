import express from "express"
// import { createDite, getDites, getDiteById, updateDite, deleteDite } from "../controllers/dite.controller.js"
import {generateDite,getDite,generateAlternate} from '../controllers/diet.controller.js'
import {isLogin} from '../middlewares/middleware.js'

const router = express.Router({mergeParams:true});

router.get('/generate',generateDite);
router.get('/',isLogin,getDite);
router.post('/alternate',isLogin,generateAlternate);

export default router;
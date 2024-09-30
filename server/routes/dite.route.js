import express from "express"
// import { createDite, getDites, getDiteById, updateDite, deleteDite } from "../controllers/dite.controller.js"
import {generateDite} from '../controllers/dite.controller.js'
import {isLogin} from '../middlewares/middleware.js'

const router = express.Router({mergeParams:true});

router.get('/:id/generate',generateDite);

export default router;
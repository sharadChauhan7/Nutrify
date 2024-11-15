import express from 'express';
import {createReview,getReview} from '../controllers/review.controller.js';
import {isLogin} from '../middlewares/middleware.js';

const router = express.Router();

router.post('/create',isLogin,createReview);
router.get('/',isLogin,getReview);

export default router;
import express from 'express';
import {createReview} from '../controllers/review.controller.js';
import {isLogin} from '../middlewares/middleware.js';

const router = express.Router();

router.post('/create',isLogin,createReview);

export default router;
import express from 'express';

import { signup,login,getUser } from '../controllers/auth.controller.js';

const router = express.Router({mergeParams:true});


router.post('/signup',signup);
router.post('/login',login);
router.get('/users',getUser);

export default router;


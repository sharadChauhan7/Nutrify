import express from 'express';

import { signup,login,getUser,isLogin,logout } from '../controllers/auth.controller.js';

const router = express.Router({mergeParams:true});


router.post('/signup',signup);
router.post('/login',login);
router.get('/users',getUser);
router.get('/logout',logout);
router.get('/isLogin',isLogin);

export default router;


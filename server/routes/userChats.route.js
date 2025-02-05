import express from 'express';
import {getUserChats,addUserChats,getUserChatIds} from '../controllers/userChats.controller.js';
import {isLogin} from '../middlewares/middleware.js'
const router = express({mergeParams:true});

router.route('/getIds').get(isLogin,getUserChatIds);
router.route('/:id').get(isLogin,getUserChats).post(isLogin,addUserChats);


export default router;
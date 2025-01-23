import express from 'express';
import {setUserStatus,getUserStatus,updateUser,updateStatus,updateStatusDite} from '../controllers/user.controller.js';
import {isLogin} from '../middlewares/middleware.js'
const router = express({mergeParams:true});


router.route('/status').get(isLogin,getUserStatus).post(isLogin,setUserStatus);
router.route('/edit').post(isLogin,updateUser);
router.route('/editStatus').post(isLogin,updateStatus);
router.route('/editStatusDite').post(isLogin,updateStatusDite);
export default router;
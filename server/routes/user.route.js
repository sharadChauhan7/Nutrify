import express from 'express';
import {setUserStatus,getUserStatus,updateUser,updateStatus,updateStatusDite} from '../controllers/user.controller.js';
import {isLogin} from '../middlewares/middleware.js'
const router = express({mergeParams:true});


router.route('/status').get(isLogin,getUserStatus).post(setUserStatus);
router.route('/edit').post(updateUser);
router.route('/editStatus').post(updateStatus);
router.route('/editStatusDite').post(updateStatusDite);
export default router;
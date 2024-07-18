import express from 'express';
import {setUserStatus,getUserStatus,updateUser,updateStatus} from '../controllers/user.controller.js';
const router = express();


router.route('/status').get(getUserStatus).post(setUserStatus);
router.route('/edit').post(updateUser);
router.route('/editStatus').post(updateStatus);
export default router;
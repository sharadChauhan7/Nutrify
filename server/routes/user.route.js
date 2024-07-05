import express from 'express';
import {setUserStatus,getUserStatus} from '../controllers/user.controller.js';
const router = express();


router.route('/status').get(getUserStatus).post(setUserStatus);
export default router;
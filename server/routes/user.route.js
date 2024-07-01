import express from 'express';
import {setUserStatus} from '../controllers/user.controller.js';
const router = express();

router.post('/status',setUserStatus);

export default router;
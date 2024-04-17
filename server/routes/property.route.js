import express from 'express';

// import { signup,login,getUser } from '../controllers/auth.controller.js';
import { getAll,create } from '../controllers/property.controller.js';

const router = express.Router();

router.get('/property',getAll);

router.post('/property',create);

export default router;
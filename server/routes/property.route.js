import express from 'express';

// import { signup,login,getUser } from '../controllers/auth.controller.js';
import { getAll,create,getOne } from '../controllers/property.controller.js';

const router = express.Router({mergeParams:true});

router.get('/property',getAll);

router.post('/property',create);

router.get('/:id',getOne);

export default router;
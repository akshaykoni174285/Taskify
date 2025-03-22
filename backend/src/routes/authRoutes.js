import express from 'express';

import {registeruser,loginuser} from '../controllers/authController.js'


const router = express.Router();

router.post('/signup',registeruser);
router.post('/login',loginuser);


export default router;
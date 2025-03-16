import express from 'express';

import {addTask,getTasks } from '../controllers/taskController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addtask',authMiddleware,addTask);
// router.get('/tasks',getTasks);
router.get('/tasks',authMiddleware,getTasks)

export default router;













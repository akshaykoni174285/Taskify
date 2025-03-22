import express from 'express';

import {addTask,getTasks,deleteTask,updateTask } from '../controllers/taskController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addtask',authMiddleware,addTask);
// router.get('/tasks',getTasks);
router.get('/tasks',authMiddleware,getTasks)

router.delete('/tasks/:id',authMiddleware,deleteTask)

router.patch('/tasks/:id',authMiddleware,updateTask);
export default router;













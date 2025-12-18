import { Router } from 'express';
import { registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', registerUser);
// Additional routes (login, getUser, etc.)

export default router;
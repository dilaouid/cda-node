import express from 'express';
import { login, register, me } from '../controllers/UserController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

// [POST] http://localhost:8000/users/login
router.post('/login', login);

// [POST] http://localhost:8000/users/register
router.post('/register', register);

// [GET] http://localhost:8000/users/me
router.get('/me', isAuthenticated, me);

export default router;
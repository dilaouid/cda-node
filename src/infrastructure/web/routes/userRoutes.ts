import express from 'express';
import { login, register } from '../controllers/UserController';

const router = express.Router();

// [POST] http://localhost:8000/users/login
router.post('/login', login);

// [POST] http://localhost:8000/users/register
router.post('/register', register);

export default router;
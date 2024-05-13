import express from 'express';
import { getCommentsByPostId } from '../controllers/CommentsController';

const router = express.Router();

// GET localhost:8000/comments/:id
// Exemple: localhost:8000/comments/158
router.get('/:id', getCommentsByPostId); // GET /comments/:id

export default router;
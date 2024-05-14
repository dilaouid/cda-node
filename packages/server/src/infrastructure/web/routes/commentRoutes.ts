import express from 'express';
import { createComment, deleteCommentById, getCommentsByPostId } from '../controllers/CommentsController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

// GET localhost:8000/comments/:id
// Exemple: localhost:8000/comments/158
router.get('/:id', getCommentsByPostId);    // GET /comments/:id
router.delete('/:id', isAuthenticated, deleteCommentById);   // DELETE /comments/:id
router.post('/:postId', isAuthenticated, createComment); // POST /comments/:postId

export default router;
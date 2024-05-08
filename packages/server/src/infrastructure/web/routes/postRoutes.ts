import express from 'express';
import { createPost, getAllPosts, getPostById } from '../controllers/PostController';
import { isAuthenticated } from '../../../middlewares/isAuthenticated';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', isAuthenticated, createPost);

export default router;
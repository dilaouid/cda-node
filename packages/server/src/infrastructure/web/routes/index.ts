import express from 'express';
import postRoutes from './postRoutes';
import commentRoutes from './commentRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)
router.use('/users', userRoutes);

export default router;
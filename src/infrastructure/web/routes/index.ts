import express from 'express';
import postRoutes from './postRoutes';
import commentRoutes from './commentRoutes';

const router = express.Router();

router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

export default router;
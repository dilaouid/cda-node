import express from 'express';
import { getVideo } from '../controllers/VideoController';

const router = express.Router();

router.get('/:id', getVideo);

export default router;
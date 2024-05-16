import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { response } from '../../../utils/response';
import { videoService } from '../../dependencies/container';

export const getVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const video = await videoService.getVideoById(id);
        if (!video)
            return response(res, { statusCode: 404, message: 'Video not found' });

        const uploadsDir = path.resolve(__dirname, '../../../infrastructure/uploads');
        const videoPath = path.join(uploadsDir, video.id, video.filename);

        if (!fs.existsSync(videoPath)) {
            return response(res, { statusCode: 404, message: 'File not found' });
        }

        const size = videoService.getVideoSize(videoPath);
        if (!size)
            return response(res, { statusCode: 500, message: 'Internal server error' });

        const { start, end } = videoService.getStartEndRange(req.headers.range ?? '', 1 * 1e6, size);

        const headers = videoService.writeStreamHeader(req.headers.range ?? '', 1 * 1e6, size);
        res.writeHead(206, headers);

        const stream = fs.createReadStream(videoPath, { start, end });
        stream.pipe(res);
    } catch(error) {
        console.error(error);
    }
}

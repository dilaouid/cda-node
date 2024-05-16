import fs from "fs";
import { IVideoRepository } from "../repositories/IVideoRepository";

export class VideoService {
    private videoRepository: IVideoRepository;

    constructor(videoRepository: IVideoRepository) {
        this.videoRepository = videoRepository;
    }

    getVideoById(id: string) {
        if (!id || id.trim().length < 1)
            return;

        return this.videoRepository.getVideoById(id);
    }

    getVideoSize(path: string) {
        if (!path || path.trim().length < 1)
            return;

        return fs.statSync(path).size;
    }

    getStartEndRange(range: string, part: number, size: number) {
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + part, size - 1);

        return { start, end };
    }

    writeStreamHeader(range: string, part: number, size: number) {
        if (!range) {
            return {
                "Content-Length": size,
                "Content-Type": "video/mp4"
            };
        }

        const { start, end } = this.getStartEndRange(range, part, size);
        const contentLength = end - start + 1;

        return {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
            "Cross-Origin-Resource-Policy": "same-site",
            "Status": 206
        };
    }
}
import { db } from "../data";
import { eq } from "drizzle-orm";
import { videos } from "../data/schema";

export class VideoRepository {
    getVideoById(id: string) {
        try {
            return db.query.videos.findFirst({
                where: eq(videos.id, id)
            });
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de récupérer la vidéo")
        }
    }
}
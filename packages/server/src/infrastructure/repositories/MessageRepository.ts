import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { messages } from "../data/schema";

export class MessageRepository {
    createMessage(roomId: string, author: string, content: string) {
        try {
            return db.insert(messages).values({
                author,
                content,
                roomId
            }).execute();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer le message");
        }
    }

    deleteMessage(id: string, userId: string) {
        try {
            return db.delete(messages).where(
                and(
                    eq(messages.id, id),
                    eq(messages.author, userId)
                )
            ).execute()
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de supprimer le message");
        }
    }
}
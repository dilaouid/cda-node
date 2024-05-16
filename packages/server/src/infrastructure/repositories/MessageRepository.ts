import { and, eq } from "drizzle-orm";
import { db } from "../data";
import { messages } from "../data/schema";
import { IMessageRepository } from "../../domain/repositories/IMessageRepository";

export class MessageRepository implements IMessageRepository {
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

    async deleteMessage(id: string, userId: string): Promise<void> {
        try {
            await db.delete(messages).where(
                and(
                    eq(messages.id, id),
                    eq(messages.author, userId)
                )
            ).execute();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de supprimer le message");
        }
    }
}
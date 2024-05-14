import { eq } from "drizzle-orm";
import { db } from "../data";
import { rooms, messages, users } from "../data/schema";

export class RoomRepository {
    createRoom() {
        try {
            return db.insert(rooms).values({}).execute();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer la room");
        }
    }

    getMessagesRoom(roomId: string) {
        try {
            return db.select({
                id: messages.id,
                content: messages.content,
                author: {
                    id: users.id,
                    username: users.username
                },
                date: messages.date
            }).from(rooms)
            .leftJoin(
                messages, eq(rooms.id, messages.roomId)
            )
            .leftJoin(
                users, eq(messages.author, users.id)
            )
            .where(
                eq(rooms.id, roomId)
            ).execute();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de récupérer les messages de la room");
        }
    }
}
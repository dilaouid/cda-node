import { RoomRepository } from "../../infrastructure/repositories/RoomRepository";

export class RoomService {
    private roomRepository: RoomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    createRoom() {
        try {
            return this.roomRepository.createRoom();
        } catch (error) {
            console.error(error);
            throw new Error("Impossible de créer la room");
        }
    }

    getAllMessagesRoom(roomId: string) {
        if (!roomId || roomId.trim().length < 5)
            return;
        return this.roomRepository.getMessagesRoom(roomId);
    }
}
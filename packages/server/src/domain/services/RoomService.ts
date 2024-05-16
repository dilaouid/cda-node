import { IRoomRepository } from "../repositories/IRoomRepository";

export class RoomService {
    private roomRepository: IRoomRepository;

    constructor(roomRepository: IRoomRepository) {
        this.roomRepository = roomRepository;
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
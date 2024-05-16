import { IMessageRepository } from "../repositories/IMessageRepository";

export class MessageService {
    private messageRepository: IMessageRepository;

    constructor(messageRepository: IMessageRepository) {
        this.messageRepository = messageRepository;
    }

    sendMessage(data: { roomId: string, author: string, content: string }) {
        if (
                !data.roomId || data.roomId?.trim()?.length < 5 ||
                !data.author || data.author?.trim()?.length < 5 ||
                !data.content || data.content?.trim()?.length < 5) {
            console.error("Impossible de créer le message: les données sont invalides");
            return;
        }

        return this.messageRepository.createMessage(data.roomId, data.author, data.content)
    }

    deleteMessage(data: { id: string, userId: string }) {
        if (!data.id || data.id?.trim()?.length < 5 || !data.userId || data.userId?.trim()?.length < 5) {
            console.error("Impossible de supprimer le message: les données sont invalides");
            return;
        }
        return this.messageRepository.deleteMessage(data.id, data.userId)
    }
}
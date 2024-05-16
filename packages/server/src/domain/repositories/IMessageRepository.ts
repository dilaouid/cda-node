export interface IMessageRepository {
    createMessage(roomId: string, author: string, content: string): Promise<any>;
    deleteMessage(id: string, userId: string): Promise<void>;
}

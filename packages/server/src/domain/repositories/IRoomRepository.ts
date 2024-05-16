export interface IRoomRepository {
    createRoom(): Promise<any>;
    getMessagesRoom(roomId: string): Promise<any>;
}

import { Socket } from "socket.io";
import { messageService, roomService } from "../../dependencies/container";

// Fonction (controller) pour envoyer un message
export const sendMessage = async (socket: Socket, data: { authorId: string, roomId: string, content: string }, userId: string) => {
    try {
        // On envoit un message (création en db)
        const message = await messageService.sendMessage({...data, author: userId})
        if (!message) // Si aucun message (ca veut dire que le service à planté)
            throw new Error("Impossible de créer le message"); // On rentre dans le catch
        socket.to(data.roomId).emit("message", message); // On envoit un socket à tout les autres clients dans la data.roomId avec en information
        // le message nouvellement crée
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de créer le message");
    }
}
export const joinRoom = async (socket: Socket, roomId: string) => {
    try {
        // On commence par récupérer tout les messages de la room
        const messages = await roomService.getAllMessagesRoom(roomId); 
        // On rejoint cette même room dans le socket (cad on pourra recevoir tout les messages de cette room à l'avenir)
        socket.join(roomId);
        // On envoit au client (AU SINGULIER), cad l'emetteur initial, la liste des messages de la room
        socket.emit("messages", messages);
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de rejoindre la salle");
    }
}

export const createRoom = async (socket: Socket) => {
    try {
        // On crée simplement la room, et on renvoit l'information de création (cad son id) à l'émetteur du socket
        const room = await roomService.createRoom();
        socket.emit("room", room);
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de créer la salle");
    }
}

export const deleteMessage = async (socket: Socket, data: { id: string, roomId: string }, userId: string) => {
    try {
        // On supprime le message indiqué en paramètre de la fonction, et on notifie tout les clients dans la data.roomId de sa
        // suppression
        await messageService.deleteMessage({ ...data, userId });
        socket.to(data.roomId).emit('deletedMessage', data.id);
    } catch (error) {
        console.error(error);
        socket.emit("error", "Impossible de supprimer le message");
    }
}

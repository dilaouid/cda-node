import { Server } from "socket.io";
import { createRoom, deleteMessage, joinRoom, sendMessage } from "../controllers/SocketController";

import { authenticateSocket } from "../../../utils/socketCookies";

export function setupSocketEvent(io: Server) {
    io.on('connection', (socket) => {

        // On identifie l'utilisateur qui vient d'executer le handshake
        const userId = authenticateSocket(socket);
        // Si cet utilisateur n'a pas d'id: il n'est pas connecté = pas le droit aux sockets
        if (!userId) return;

        console.info(`${socket.id} connected`);

        // Lorsque le client emit un socket "createRoom", on appelle la fonction "createRoom" ici présente
        socket.on("createRoom", () => {
            createRoom(socket);
        });

        // Lorsque le client emit un socket "joinRoom", on appelle la fonction "joinRoom" ici présente
        socket.on('joinRoom', (roomId: string) => {
            joinRoom(socket, roomId);
        });

        // Lorsque le client emit un socket "sendMessage", on appelle la fonction "sendMessage" ici présente
        socket.on('sendMessage', (data) => {
            sendMessage(socket, data, '54qsd56-dsf5d4s56-sd54f5ds')
        });

        // Lorsque le client emit un socket "deleteMessage", on appelle la fonction "deleteMessage" ici présente
        socket.on('deleteMessage', (data: { id: string, roomId: string }) => {
            deleteMessage(socket, data, '54qsd56-dsf5d4s56-sd54f5ds')
        });

        // Lorsque le client rafraichit la page, quitte l'onglet, etc.... on notifie de sa déconnexion
        socket.on('disconnect', () => {
            console.info(`${socket.id} disconnected`);
        });

    });
}
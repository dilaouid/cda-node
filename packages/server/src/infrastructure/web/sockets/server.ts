import { Server } from "socket.io";
import http from "http";

import env from "../../../config/env";
import { setupSocketEvent } from "./events";

const { FRONTEND_URL } = env;

export function initializeSocketServer(server: http.Server): Server {
    const io = new Server(server, {
        cors: {
            origin: FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        }
    });
    setupSocketEvent(io);
    return io;
}
import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

import env from '../config/env';

const { JWT_SECRET } = env;

export function authenticateSocket(socket: Socket): string | null {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
        socket.emit('error', 'No cookies found');
        return null;
    }

    const parsedCookies: Record<string, string> = {};
    cookies.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) {
            parsedCookies[key] = decodeURIComponent(value);
        }
    });
    const accessToken = parsedCookies.accessToken;
    if (!accessToken) {
        socket.emit('error', 'No access token found');
        return null;
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;
        return decoded.userId;
    } catch (error) {
        socket.emit('error', 'Invalid token');
        return null;
    }
}
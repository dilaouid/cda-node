import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user: { userId: string, name: string }
        }
    }
}

export interface CustomRequest extends Request {
    user: { userId: string, name: string }
}
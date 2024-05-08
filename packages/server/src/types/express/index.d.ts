import { Request } from "express";

declare module "express-serve-static-core" {
    interface Request {
        user: { userId: string, name: string }
    }
}

export interface CustomRequest extends Request {
    user: { userId: string, name: string }
}
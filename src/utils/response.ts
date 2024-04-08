import { Response } from "express"

export interface IError {
    field: string;
    message: string;
}

interface INormalized {
    statusCode: number;
    message: string;
    data?: string[] | object | null | IError[];
}

export const response = (res: Response, normalized: INormalized): Response => {
    res.setHeader("X-Powered-By", "3wa");
    return res.status(normalized.statusCode).json({
        message: normalized.message,
        data: normalized.data
    });
}
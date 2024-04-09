import { NextFunction, Response, Request } from "express";
import { response } from "../utils/response";

// middleware de gestion d'erreur, qui permet de gérer les erreurs de manière centralisée
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // affiche l'erreur dans le terminal
    return response(res, { statusCode: 500, message: 'Internal Server Error' });    
}
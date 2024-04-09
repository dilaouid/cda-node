import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import env from "../config/env";

import jwt from 'jsonwebtoken';

const { JWT_SECRET } = env;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token)
        return response(res, { statusCode: 403, message: 'Token missing'});
    try {
        // on décode le jwt dans le cookie 'token' avec notre secret
        const decoded = jwt.verify(token, JWT_SECRET);

        // On ajoute le payload dans la propriété req pour pouvoir l'utiliser dans les routes
        req.push(decoded);

        // On passe au controller ou au mw suivant: tout s'est bien passé
        next();
    } catch(err) {
        // Le jwt est invalide: on envoit une 401 l'user n'est pas autorisé à accéder à la ressource
        return response(res, { statusCode: 401, message: 'Unauthorized' });
    }
};
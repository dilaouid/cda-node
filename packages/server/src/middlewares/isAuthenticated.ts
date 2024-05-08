import { NextFunction, Response } from "express";
import { response } from "../utils/response";
import env from "../config/env";

import jwt from 'jsonwebtoken';
import { CustomRequest } from "../types/express";
import { table } from "console";

const { JWT_SECRET } = env;

export const isAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;    
    if (!accessToken)
        return response(res, { statusCode: 403, message: 'Token missing'});
    try {
        // on décode le jwt dans le cookie 'token' avec notre secret
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        const { userId, name } = decoded as jwt.JwtPayload;

        // On ajoute le payload dans la propriété req pour pouvoir l'utiliser dans les routes
        req.user = { userId, name };
        table(decoded);

        // On passe au controller ou au mw suivant: tout s'est bien passé
        next();
    } catch(err) {
        // Le jwt est invalide: on envoit une 401 l'user n'est pas autorisé à accéder à la ressource
        return response(res, { statusCode: 401, message: 'Unauthorized' });
    }
};
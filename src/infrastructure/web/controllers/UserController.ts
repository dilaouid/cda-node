import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../../../config/env';

import { response } from '../../../utils/response';

const { JWT_SECRET, NODE_ENV } = env;

export const login = (req: Request, res: Response) => {
    /* ici on insérera notre logique d'authentification pour vérifier si les informations saisies
    sont correctes */
    const user = {
        id: "abc"
    };

    // création du JWT (en utilisant notre clé secrete)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // écriture du cookie (cross domain) avec comme nom 'token' et comme valeur le JWT crée
    // au dessus
    res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict'
    });-
    response(res, { statusCode: 200, message: 'OK' });
}
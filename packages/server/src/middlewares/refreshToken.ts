import { Request, Response, NextFunction } from "express";
import { AuthService } from "../domain/services/AuthService";

const authService = new AuthService();

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // On récupére le refreshToken des cookies de l'utilisateur
    const { refreshToken } = req.cookies;

    // Si aucun refresh token n'est présent, on passe au mw suivant
    if (!refreshToken)
        return next();

    try {
        const newAccessToken = authService.refreshAccessToken(refreshToken);
        // Si le refresh est réussit: on renouvelle l'accesstoken dans nos cookies
        if (newAccessToken) {
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true, // protection attaque XSS
                secure: process.env.NODE_ENV === 'production' // disponible que en https en production
            });
        }
        // Passage au middleware suivant
        next();
    } catch (error) {
        console.error(error);
    }
};
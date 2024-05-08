import jwt from 'jsonwebtoken';
import env from '../../config/env';
import fs from 'fs';
import path from 'path';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

const { REFRESH_SECRET, JWT_SECRET } = env;
const usersFilePath = path.resolve(__dirname, '../../../data/users.json');

export class AuthService {
    private refreshTokenStore: Map<string, string> = new Map();
    private UserRepository = new UserRepository();

    // générer un JWT pour un user avec une durée de validité de 15 mn
    issueAccessToken(id: string): string {
        return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '15m' });
    }

    issueRefreshToken(id: string): string {
        // on crée un refreshToken qui va durer longtemps (genre 7j)
        const refreshToken = jwt.sign({ userId: id}, REFRESH_SECRET, { expiresIn: '7d' });
        const user = this.UserRepository.getUserById(id);
        if (user) {
            user.refreshToken = refreshToken;
            this.UserRepository.updateUser(user);
        }

        // On retourne le JWT pour s'en servir dans le controller (écriture de cookies)
        return refreshToken;
    }

    refreshAccessToken(refreshToken: string): string | void {
        try {
            // On vérifie que le token en paramètre est bien valide
            const payload = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;
            const user = this.UserRepository.getUserById(payload.userId);

            if (user && user.refreshToken === refreshToken) {
                // On génère un nouveau token d'accès
                return this.issueAccessToken(payload.userId);
            }

            // On récupére ce même token dans notre store
            const storedRefreshToken = this.refreshTokenStore.get(payload.userId);

            // Si ce token existe dans le store, ca implique qu'il est valide.
            if (storedRefreshToken === refreshToken) {
                // On génère un nouveau token de rafraichissement
                const newAccessToken = this.issueAccessToken(payload.userId);
                return newAccessToken;
            } else {
                console.table({storedRefreshToken, refreshToken});

                
                throw new Error('Invalid refresh token');
            }
        } catch(err) {
            console.error(err);

            throw new Error('Invalid refresh token');
        }
    }
}
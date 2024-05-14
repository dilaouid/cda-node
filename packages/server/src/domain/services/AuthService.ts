import jwt from 'jsonwebtoken';
import env from '../../config/env';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { User } from '../entities/User';

const { REFRESH_SECRET, JWT_SECRET } = env;

export class AuthService {
    private refreshTokenStore: Map<string, string> = new Map();
    private UserRepository = new UserRepository();

    // générer un JWT pour un user avec une durée de validité de 15 mn
    issueAccessToken(id: string): string {
        return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '15m' });
    }

    async issueRefreshToken(id: string): Promise<string> {
        // on crée un refreshToken qui va durer longtemps (genre 7j)
        const refreshToken = jwt.sign({ userId: id}, REFRESH_SECRET, { expiresIn: '7d' });
        const user = await this.UserRepository.getUserById(id, { id: true, refreshToken: true });
        if (user) {
            this.UserRepository.updateUser({...user, refreshToken: refreshToken} as User);
        }

        // On retourne le JWT pour s'en servir dans le controller (écriture de cookies)
        return refreshToken;
    }

    async refreshAccessToken(refreshToken: string): Promise<string | void> {
        try {
            // On vérifie que le token en paramètre est bien valide
            const payload = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;
            const user = await this.UserRepository.getUserById(payload.userId, { id: true, refreshToken: true });

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
                // delete access token cookies and refresh token cookies
                if (user) {
                    user.refreshToken = ''
                    this.UserRepository.updateUser(user as User);
                }

                throw new Error('Invalid refresh token');
            }
        } catch(err) {
            console.error(err);

            throw new Error('Invalid refresh token');
        }
    }
}
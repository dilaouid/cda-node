import { Request, Response } from 'express';
import env from '../../../config/env';
import bcrypt from 'bcrypt';

import { UserRepository } from '../../repositories/UserRepository';
import { AuthService } from '../../../domain/services/AuthService';

import { response } from '../../../utils/response';

const { NODE_ENV } = env;

const userRepo = new UserRepository();
const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // on récupére l'utilisateur avec l'username saisit dans le formulaire (req.body)
        const user = userRepo.getUserByUsername(username);
        if (!user)
            return response(res, { statusCode: 401, message: 'Authentication failed' });

        // On va comparer le mot de passe hashé (entre celui du formulaire et celui enregistré dans notre json)
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return response(res, { statusCode: 401, message: 'Authentication failed' });

        // On crée notre accessToken et refreshToken qu'on stockera en cookie pour valider l'authentification
        const accessToken = authService.issueAccessToken(user.id as string);
        const refreshToken = authService.issueRefreshToken(user.id as string);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // pour éviter de lire le cookie client-side en JS (protection XSS)
            secure: NODE_ENV === 'production' // passage du cookie en https si on est en prod
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        });

        response(res, { statusCode: 200, message: 'Authentication successful' });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error' });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        console.log(req.body);
        
        if (!username?.trim() || !password?.trim())
            return response(res, { statusCode: 400, message: 'Invalid username or password' });

        // Vérification de l'unicité du nom d'utilisateur saisit
        const existingUsername = userRepo.getUserByUsername(username);
        if (existingUsername)
            return response(res, { statusCode: 409, message: 'Username already exists' });

        // hashage du mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        userRepo.createUser({ username, password: hashedPassword });
        response(res, {statusCode: 201, message: 'User created successfully'});
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    } 
}
// dotenv permet de charger les variables d'environnement depuis un fichier .env
import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import helmet from 'helmet'
import cookieParser from "cookie-parser";

import router from "./infrastructure/web/routes";

import env from "./config/env";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";

// Création intance app express
const app = express();

app.use(helmet());

// mw pour pouvoir lire les cookies plus facilement
app.use(cookieParser());

// Port d'écoute
const { PORT } = env;

// un middleware est executé avant que la requête n'atteigne la route spécifique
function middleware1(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 1");
    next();
}

// applique le middleware1 à toutes les requêtes entrantes avant qu'elles n'atteignent les routes
// spécifiques
app.use(requestLogger);

// [GET] http://localhost:8000/
app.get("/", middleware1, function (req: Request, res: Response) {
    console.log("Ceci est un console log, qui ne sera JAMAIS affiché dans le navigateur, mais seulement le terminal du serveur (ici terminal vscode)")
    res.send("Hello World pas piqué des hannetons");
})

// [GET] http://localhost:8000/error
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Erreur de test pour montrer les mw d\'erreurs');
    next(error); // pour passer à l'errorHandler
})

app.use(router);

// Middleware de gestion d'erreur => toujours tout à la fin des routes et autres mw
app.use(errorHandler);

// Faire écouter l'app sur le port spécifié puis afficher msg
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
import { Request, NextFunction, Response } from "express";

// middleware qui log les requêtes entrantes (chemin + méthode utilisée)
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${req.method}] - ${req.path}`);
    next();
}
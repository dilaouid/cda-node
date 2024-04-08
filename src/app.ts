import express, { Request, Response } from "express";
import router from "./infrastructure/web/routes";

// Création intance app express
const app = express();

// Port d'écoute
const PORT = 8000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World pas piqué des hannetons");
})

app.use(router);

// Faire écouter l'app sur le port spécifié puis afficher msg
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
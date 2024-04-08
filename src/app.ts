import express, { Request, Response } from "express";
import router from "./infrastructure/web/routes";

// Création intance app express
const app = express();

// Port d'écoute
const PORT = 8000;


// http://localhost:8000/
app.get("/", (req: Request, res: Response) => {
    console.log("Ceci est un console log, qui ne sera JAMAIS affiché dans le navigateur, mais seulement le terminal du serveur (ici terminal vscode)")
    res.send("Hello World pas piqué des hannetons");
})

app.use(router);

// Faire écouter l'app sur le port spécifié puis afficher msg
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
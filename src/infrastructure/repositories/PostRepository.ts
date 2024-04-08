import { Post } from "../../domain/entities/Post";
import fs from 'fs';
import path from "path";

export class PostsRepository {
    private posts: Post[] = [];

    // Le chemin du fichier JSON des pots (à partir du repertoire courant)
    private filePath = path.join(__dirname, '..', 'data', 'posts.json');

    constructor() {
        // on charge les données des pots à partir du fichier JSON dès le constructeur pour
        // qu'il soient disponibles dans la class
        this.posts = this.loadPosts();
    }

    // Récupérer un post par son id
    getPostById(id: string) {
        return this.posts.find(post => post.id === id);
    }

    // Récupérer tout les posts existants dans notre posts.json
    getAllPosts(): Post[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data);
    }

    // Charger les données des posts à partir du fichier JSON (en private car utilisé seulement dans la class)
    private loadPosts(): Post[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data);
    }

    // ajouter un post à notre post.json
    savePosts(post: Post[]) {
        // On convertit les données en JSON et on les écrit dans le fichier
        const data = JSON.stringify(post);

        // On écrit les données dans le fichier de manière synchrone
        fs.writeFileSync(this.filePath, data);
    }

    // on récupére l'id d'un post en fonction de son titre
    getPostIdByTitle(title: string): string | undefined {
        const post = this.posts.find(post => post.title === title);
        return post?.id;
    }
}
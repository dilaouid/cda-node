import { Post, PostWithComments } from "../../domain/entities/Post";
import fs from 'fs';
import path from "path";
import { CommentRepository } from "./CommentRepository";
import { UserRepository } from "./UserRepository";
import { User } from "../../domain/entities/User";

// Repository qui gère le CRUD des posts
export class PostsRepository {
    private posts: Post[] = [];
    private commentRepository = new CommentRepository();
    private userRepo = new UserRepository();

    // Le chemin du fichier JSON des pots (à partir du repertoire courant)
    private filePath = path.join(__dirname, '..', 'data', 'posts.json');

    constructor() {
        // on charge les données des pots à partir du fichier JSON dès le constructeur pour
        // qu'il soient disponibles dans la class
        this.posts = this.loadPosts();
    }

    // Récupérer un post par son id
    getPostById(id: string): PostWithComments | undefined {
        const post = this.posts.find(post => post.id === id);
        if (!post) return undefined;
        const author = this.userRepo.getUserById(post.author as string);
        if (!author) return undefined;
        
        const comments = this.commentRepository.getCommentsByPostId(id);
        comments.forEach(comment => {
            const user = this.userRepo.getUserById(comment.author as string);
            comment.author = user as User;
            delete comment.postId;
        });
        return { ...post, author, comments };
    }

    // Récupérer tout les posts existants dans notre posts.json
    getAllPosts(): Post[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const posts = JSON.parse(data);

        // get the user for the author of the post
        posts.forEach((post: Post) => {
            const user = this.userRepo.getUserById(post.author as string);
            post.author = user as User;
        });

        return posts;
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
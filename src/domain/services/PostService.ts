import { Post } from "../entities/Post";
import { PostsRepository } from "../../infrastructure/repositories/PostRepository";
import crypto from 'crypto'

export class PostService {
    private postsRepository: PostsRepository;

    constructor() {
        this.postsRepository = new PostsRepository();
    }

    getPostById(id: string): Post | undefined {
        return this.postsRepository.getPostById(id);
    }

    getAllPosts(): Post[] {
        return this.postsRepository.getAllPosts();
    }

    addPost(post: Post) {
        const posts = this.postsRepository.getAllPosts();

        // On ajoute le nouveau post à la liste des posts
        posts.push({
            id: crypto.randomUUID(),
            ...post,
        });

        // On sauvegarde les posts
        this.postsRepository.savePosts(posts);
    }

}
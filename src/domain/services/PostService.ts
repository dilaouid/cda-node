import { Post } from "../entities/Post";
import { PostsRepository } from "../../infrastructure/repositories/PostRepository";

export class PostService {
    private postsRepository: PostsRepository;

    constructor() {
        this.postsRepository = new PostsRepository();
    }

    getPostById(id: string): Post | undefined {
        return this.postsRepository.getPostById(id);
    }

}
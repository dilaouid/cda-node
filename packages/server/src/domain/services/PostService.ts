import { NewPost } from "../entities/Post";
import { PostsRepository } from "../../infrastructure/repositories/PostRepository";
import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/data";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

export class PostService {
    private postsRepository: PostsRepository;
    private userRepository: UserRepository;

    constructor() {
        this.postsRepository = new PostsRepository();
        this.userRepository = new UserRepository();
    }

    getPostById(id: string) {
        if (!id || id.trim().length < 1)
            return;
        return this.postsRepository.getPostById(id);
    }

    getAllPosts() {
        return this.postsRepository.getAllPosts();
    }

    async addPost(post: NewPost) {
        if (post?.title?.trim().length < 1 || post?.content?.trim().length < 1)
            return;
        const newPost = await this.postsRepository.savePosts(post);
        return newPost[0].id;
    }

    getPostIdByTitle(title: string) {
        if (!title ||title.trim().length < 3)
            return;
        return this.postsRepository.getPostIdByTitle(title);
    }

}
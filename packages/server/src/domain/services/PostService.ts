import { NewPost } from "../entities/Post";
import { IPostRepository } from "../repositories/IPostRepository";

export class PostService {
    private postsRepository: IPostRepository;

    constructor(postsRepository: IPostRepository) {
        this.postsRepository = postsRepository;
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
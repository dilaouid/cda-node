import { Post, PostWithComments } from "../entities/Post";
import { Comment } from "../entities/Comment";
import { PostsRepository } from "../../infrastructure/repositories/PostRepository";
import crypto from 'crypto'

export class PostService {
    private postsRepository: PostsRepository;

    constructor() {
        this.postsRepository = new PostsRepository();
    }

    getPostById(id: string): PostWithComments | undefined {
        return this.postsRepository.getPostById(id);
    }

    getAllPosts(): Post[] {
        return this.postsRepository.getAllPosts();
    }

    addPost(post: Post) {
        const posts = this.postsRepository.getAllPosts();
        posts.map((post: any) => {
            post.author = post.author.id;
        });
        
        if (post?.title?.trim().length < 1 || post?.content?.trim().length < 1)
            return;

        const newPost = {
            id: crypto.randomUUID(),
            ...post,
        };
        // On ajoute le nouveau post à la liste des posts
        posts.push(newPost);

        // On sauvegarde les posts
        this.postsRepository.savePosts(posts);
        return newPost;
    }

    getPostIdByTitle(title: string): string | undefined {
        return this.postsRepository.getPostIdByTitle(title);
    }

}
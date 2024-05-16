import { NewPost } from "../entities/Post";

export interface IPostRepository {
    getPostById(id: string): Promise<any>;
    getAllPosts(): Promise<any>;
    deletePost(id: string): Promise<void>;
    savePosts(post: NewPost): Promise<Array<{ id: string }>>;
    getPostIdByTitle(title: string): Promise<{ id: string } | undefined>;
}

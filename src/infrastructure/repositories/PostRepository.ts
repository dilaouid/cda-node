import { Post } from "../../domain/entities/Post";
import fs from 'fs';
import path from "path";

export class PostsRepository {
    private posts: Post[] = [];

    private filePath = path.join(__dirname, '..', 'data', 'posts.json');

    constructor() {
        this.posts = this.loadPosts();
    }

    getPostById(id: string) {
        return this.posts.find(post => post.id === id);
    }

    private loadPosts(): Post[] {
        const data = fs.readFileSync(this.filePath, 'utf-8')
        return JSON.parse(data);
    }
}
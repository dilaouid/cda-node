import { Comment } from "../../domain/entities/Comment";
import fs from 'fs';
import path from "path";

export class CommentRepository {
    private filePath = path.join(__dirname, '..', 'data', 'comments.json');

    getAllComments(): Comment[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    getCommentsByPostId(postId: string): Comment[] {
        const comments = this.getAllComments();
        return comments.filter(comment => comment.postId === postId);
    }
}
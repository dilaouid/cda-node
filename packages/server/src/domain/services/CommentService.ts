import { CommentRepository } from "../../infrastructure/repositories/CommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
    private commentRepository: CommentRepository;

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    getCommentById(id: string) {
        if (!id || id.trim().length < 5)
            return;
        return this.commentRepository.getCommentById(id);
    }


    deleteCommentById(id: string, userId: string) {
        if (!id || id.trim().length < 5)
            return;
        return this.commentRepository.deleteCommentById(id, userId);
    }

    createComment(comment: NewComment) {
        if (!comment || comment.content.trim().length < 5)
            return;
        return this.commentRepository.createComment(comment);
    }

    getAllComments() {
        return this.commentRepository.getAllComments();
    }
}
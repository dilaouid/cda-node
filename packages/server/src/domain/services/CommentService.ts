import { ICommentRepository } from "../repositories/ICommentRepository";
import { NewComment } from "../entities/Comment";

export class CommentService {
    private commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
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
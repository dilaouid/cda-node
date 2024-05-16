import { NewComment } from "../entities/Comment";

export interface ICommentRepository {
    getCommentById(id: string): Promise<any>;
    deleteCommentById(id: string, userId: string): Promise<void>;
    createComment(comment: NewComment): Promise<void>;
    getAllComments(): Promise<any>;
}

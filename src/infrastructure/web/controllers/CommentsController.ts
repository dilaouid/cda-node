import { Request, Response } from "express";
import { CommentRepository } from "../../repositories/CommentRepository";
import { response } from "../../../utils/response";

const commentRepository = new CommentRepository();

export const getCommentsByPostId = (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = commentRepository.getCommentsByPostId(id);
    console.table(comments)
    response(res, { statusCode: 200, data: comments, message: 'OK' });
};
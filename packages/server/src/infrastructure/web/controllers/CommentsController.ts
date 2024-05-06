import { Request, Response } from "express";
import { CommentRepository } from "../../repositories/CommentRepository";
import { response } from "../../../utils/response";

const commentRepository = new CommentRepository();

/**
 * afficher à l'écran l'ensemble des commentaires d'un article filtré vai son id  
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 * @see [super explication en +](https://typedoc.org/tags/see/)
 */
export const getCommentsByPostId = (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = commentRepository.getCommentsByPostId(id);
    console.table(comments)
    response(res, { statusCode: 200, data: comments, message: 'OK' });
};
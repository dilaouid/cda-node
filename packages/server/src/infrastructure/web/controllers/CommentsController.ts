import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { commentService } from "../../dependencies/container";
import '../../../types/express'; // Activate module declaration

/**
 * afficher à l'écran l'ensemble des commentaires d'un article filtré via son id  
 * @param req - requête http gérée via  express
 * @param res - reponse http gérée par express 
 * @see [super explication en +](https://typedoc.org/tags/see/)
 */
export const getCommentsByPostId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const comments = await commentService.getCommentById(id);
    console.table(comments)
    response(res, { statusCode: 200, data: comments, message: 'OK' });
};


export const deleteCommentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;
    await commentService.deleteCommentById(id, userId);
    response(res, { statusCode: 200, message: 'Comment deleted' });
}

// localhost:8000/comments/:idDeLarticle
export const createComment = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { userId } = req.user;
    const { content } = req.body;
    await commentService.createComment({ content, postId, author: userId });
    response(res, { statusCode: 201, message: 'Comment created' });
}
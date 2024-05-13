import { db } from "../data";
import { Comment, NewComment } from "../../domain/entities/Comment";
import { comments, posts, users } from "../data/schema";
import { and, eq } from "drizzle-orm";

/**
 * Repository qui gère le CRUD des commentaires
 */
export class CommentRepository {

    getCommentById(id: string) {
        try {
            return db.select({
                id: comments.id,
                content: comments.content,
                date: comments.date,
                author: {
                    id: users.id,
                    username: users.username
                }
            }).from(comments)
            .leftJoin(
                users, eq(users.id, comments.author)
            ).where(
                eq(comments.id, id)
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer le commentaire');
        }
    }

    deleteCommentById(id: string, userId: string) {
        try {
            return db.delete(comments).where(
                and(
                    eq(comments.id, id),
                    eq(comments.author, userId)
                )
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de supprimer le commentaire');
        }
    }

    createComment(comment: NewComment) {
        try {
            return db.insert(comments).values(comment).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de créer le commentaire');
        }
    }


    /**
     * Récupère tous les commentaires du fichier comments.json
     */
    getAllComments() {
        try {
            return db.select({
                id: comments.id,
                content: comments.content,
                date: comments.date,
                post: {
                    id: posts.id,
                    title: posts.title
                },
                author: {
                    id: users.id,
                    username: users.username
                }
            }).from(comments)
            .leftJoin(
                users, eq(users.id, comments.author)
            ).leftJoin(
                posts, eq(posts.id, comments.postId)
            ).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer les commentaires');
        }
    }

}
import { Comment } from "../../domain/entities/Comment";
import fs from 'fs';
import path from "path";

/**
 * Repository qui gère le CRUD des commentaires
 */
export class CommentRepository {
    private filePath = path.join(__dirname, '..', 'data', 'comments.json');

    /**
     * Récupère tous les commentaires du fichier comments.json
     * @returns {Comment[]}
     */
    getAllComments(): Comment[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    /**
     * // Récupère un commentaire par son id
     * @param {string} postId - identifiant unique du commentaire
     * @returns {Comment[]}
     */
    getCommentsByPostId(postId: string): Comment[] {
        const comments = this.getAllComments();
        return comments.filter(comment => comment.postId === postId);
    }
}
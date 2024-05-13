import { eq } from "drizzle-orm";
import { NewPost, Post } from "../../domain/entities/Post";
import { User } from "../../domain/entities/User";
import { db } from "../data";
import { comments, posts, users } from "../data/schema";

// Repository qui gère le CRUD des posts
export class PostsRepository {
    // Récupérer un post par son id
    getPostById(id: string) {
        try {
            return db.select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                author: {
                    id: users.id,
                    username: users.username
                },
                date: posts.date,
                comments: {
                    id: comments.id,
                    content: comments.content,
                    date: comments.date
                }
            }).from(posts)
            .leftJoin(
                comments, eq(posts.id, comments.postId)
            ).leftJoin(
                users, eq(posts.author, users.id)
            ).where(
                eq(posts.id, id)
            ).execute();

            /* SELECT posts.id, posts.title, posts.content, posts.date, users.id, users.username, comments.id, comments.content,
                comments.date FROM posts LEFT JOIN comments ON posts.id = comments.postId LEFT JOIN users ON posts.authir = users.id
                WHERE posts.id = $1
            */
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de récupérer le post');
        }
    }

    // Récupérer tout les posts existants dans notre posts.json
    getAllPosts() {
        try {
            return db.select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                author: {
                    id: users.id,
                    username: users.username
                },
                date: posts.date,
                comments: {
                    id: comments.id,
                    content: comments.content,
                    date: comments.date
                }
            }).from(posts)
            .leftJoin(
                comments, eq(posts.id, comments.postId)
            ).leftJoin(
                users, eq(posts.author, users.id)
            ).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer les posts');
        }
    }

    deletePost(id: string) {
        try {
            return db.delete(posts).where(eq(posts.id, id)).execute();
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de supprimer le post');
        }
    }
    


    // ajouter un post à notre post.json
    savePosts(post: NewPost) {
        try {
            return db.insert(posts).values(post).returning({id: posts.id}).execute();
        } catch(err) {
            console.error(err);
            throw new Error('Impossible de sauvegarder le post');
        }
    }

    // on récupére l'id d'un post en fonction de son titre
    getPostIdByTitle(title: string) {
        try {
            return db.query.posts.findFirst({
                where: eq(posts.title, title),
                columns: {
                    id: true
                }
            })
        } catch (err) {
            console.error(err);
            throw new Error('Impossible de récupérer l\'id du post');
        }
    }
}
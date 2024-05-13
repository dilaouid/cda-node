import { db } from "../data";
import { users } from "../data/schema";
import { User, NewUser } from "../../domain/entities/User";
import { eq } from "drizzle-orm";


/**
 * Repository qui gère le CRUD des utilisateurs
 */
export class UserRepository {
    /**
     * Récupère tous les utilisateurs
     */
    getAllUsers() {
        try {
            return db.query.users.findMany({
                columns: {
                    id: true,
                    username: true
                }
            });
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer les utilisateurs")
        }
    }

    /**
     * Récupère un utilisateur en fonction de son id
     */
    getUserById(id: string) {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns: {
                    id: true,
                    username: true
                }
            })
            // SELECT id, username FROM users WHERE id = $1
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    /**
     * Récupère un utilisateur en fonction de son username
     */
    getUserByUsername(username: string) {
        try {
            return db.query.users.findFirst({
                where: eq(users.username, username),
                columns: {
                    id: true,
                    username: true
                }
            })
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    /**
     * Création d'un nouvel utilisateur
     */
    createUser(user: NewUser) {
        try {
            return db.insert(users).values(user).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de créer l'utilisateur")
        }
    }

    /**
     * Met à jour un utilisateur
     */
    updateUser(user: User) {
        try {
            return db.update(users)
                .set(user)
                .where(
                    eq(users.id, user.id)
                ).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de mettre à jour l'utilisateur")
        }
    }
}
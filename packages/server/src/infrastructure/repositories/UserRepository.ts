import { db } from "../data";
import { users } from "../data/schema";
import { User, NewUser, UserColumns } from "../../domain/entities/User";
import { eq } from "drizzle-orm";
import { IUserRepository } from "../../domain/repositories/IUserRepository";


/**
 * Repository qui gère le CRUD des utilisateurs
 */
export class UserRepository implements IUserRepository {
    /**
     * Récupère tous les utilisateurs
     */
    getAllUsers(): Promise< Partial<User>[] > {
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
    getUserById(id: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
                columns
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
    getUserByUsername(username: string, columns: UserColumns): Promise<Partial<User | undefined>> {
        try {
            return db.query.users.findFirst({
                where: eq(users.username, username),
                columns
            })
        } catch(err) {
            console.error(err);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    }

    /**
     * Création d'un nouvel utilisateur
     */
    async createUser(user: NewUser): Promise<void> {
        try {
            await db.insert(users).values(user).execute();
        } catch (err) {
            console.error(err);
            throw new Error("Impossible de créer l'utilisateur")
        }
    }

    /**
     * Met à jour un utilisateur
     */
    async updateUser(user: User): Promise<void> {
        try {
            await db.update(users)
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
import { User } from "../../domain/entities/User";
import fs from 'fs';
import path from "path";
import crypto from 'crypto';

/**
 * Repository qui gère le CRUD des utilisateurs
 */
export class UserRepository {
    private filePath = path.join(__dirname, '..', 'data', 'users.json');

    /**
     * Récupère tous les utilisateurs
     */
    getAllUsers(): User[] {
        // On récupére en texte brut le contenu du fichier users.json
        const data = fs.readFileSync(this.filePath, 'utf-8');

        // On retourne tout les utilisateurs, formatés cette fois ci en JSON
        return JSON.parse(data);
    }

    /**
     * Récupère un utilisateur en fonction de son id
     */
    getUserById(id: string) {
        // On commence par récupérer tout les utilisateurs
        const users = this.getAllUsers();  

        // On va appliquer un HOF (find) pour trouver seulement l'utilisateur qui nous intéresse, en retirant le mot de passe
        const user = users.find(user => user.id === id);
        if (!user) return undefined;
        return {
            ...user,
            password: undefined
        }
    }

    /**
     * Récupère un utilisateur en fonction de son username
     */
    getUserByUsername(username: string) {
        // On commence par récupérer tout les utilisateurs
        const users = this.getAllUsers();  

        // On va appliquer un HOF (find) pour trouver seulement l'utilisateur qui nous intéresse
        return users.find(user => user.username === username);
    }

    /**
     * Création d'un nouvel utilisateur
     */
    createUser(user: User) {
        // On commence par récupérer tout les utilisateurs
        const users = this.getAllUsers();

        // On mets à jour le tableau récupéré, avec le nouvel utilisateur
        users.push({
            ...user,
            id: crypto.randomUUID()
        })

        // On mets à jour le fichier users.json
        fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
    }
}
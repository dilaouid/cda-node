import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "../../infrastructure/data/schema";

// Ce type represente le modele d'un user au moment de sa selection dans la db
// cad le type User aura les memes propriétés que la table users
// Marche pour SELECT, DELETE, UPDATE
export type User = InferSelectModel<typeof users>;

// de même pour NewUser: il aura les memes propriétés que la table users
// sauf les propriétés qui sont générés automatiquement (comme id par exemple)
export type NewUser = InferInsertModel<typeof users>;
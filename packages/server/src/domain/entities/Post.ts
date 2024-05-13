import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { posts } from "../../infrastructure/data/schema";

// Ce type represente le modele d'un post au moment de sa selection dans la db
// cad le type Post aura les memes propriétés que la table posts
export type Post = InferSelectModel<typeof posts>;

// de même pour NewPost: il aura les memes propriétés que la table posts
// sauf les propriétés qui sont générés automatiquement (comme id par exemple)
export type NewPost = InferInsertModel<typeof posts>;
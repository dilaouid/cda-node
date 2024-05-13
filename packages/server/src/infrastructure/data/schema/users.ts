import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// 1er paramètre = nom de la table
// 2ème paramètre = structure de la table (contient les colonnes de la table et leurs types)
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    // varchar 255
    username: varchar('username', { length: 255}).notNull(),
    password: varchar('password', { length: 255}).notNull(),
    refreshToken: varchar('refresh_token', { length: 255})
})
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { users, posts } from './';

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(), // pk
    postId: uuid('postId').references(() => posts.id).notNull(), // foreign key
    author: uuid('author').references(() => users.id).notNull(), // foreign key
    content: text('content').notNull(),
    date: timestamp('date').defaultNow().notNull()
})
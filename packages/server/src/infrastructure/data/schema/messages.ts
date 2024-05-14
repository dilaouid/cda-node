import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users, rooms } from "./"

export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),
    content: text('content').notNull(),
    author: uuid('author').references(() => users.id).notNull(),
    roomId: uuid('roomId').references(() => rooms.id).notNull(),
    date: timestamp('date').defaultNow().notNull()
})
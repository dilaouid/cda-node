import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core"

export const videos = pgTable("videos", {
    id: uuid('id').defaultRandom().primaryKey(),
    filename: varchar('filename', { length: 255 }).notNull(),
    original_filename: varchar('original_filename', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    mime_type: varchar('mime_type', { length: 255 }).notNull()
});
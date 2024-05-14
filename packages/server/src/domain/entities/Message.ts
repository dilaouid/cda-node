import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { messages } from "../../infrastructure/data/schema";

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;

export type MessageColumns = { [key in keyof Message]?: boolean };
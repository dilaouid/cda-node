import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { rooms } from "../../infrastructure/data/schema";

export type Room = InferSelectModel<typeof rooms>;
export type NewRoom = InferInsertModel<typeof rooms>;
export type RoomColumns = { [key in keyof Room]?: boolean };
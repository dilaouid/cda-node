import { User } from "./User";

export interface Comment {
    id?: string;
    postId?: string;
    content: string;
    author: User | string;
    date: Date;
}
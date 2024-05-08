import { Comment } from "./Comment";
import { User } from "./User";

export interface Post {
    id?: string;
    title: string;
    content: string;
    author: string | User;
    comments?: Comment[];
    date: Date;
};

export interface PostWithComments extends Post {
    comments: Comment[];
}
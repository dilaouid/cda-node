import { Comment } from "./Comment";

export interface Post {
    id?: string;
    title: string;
    content: string;
    author: string;
    comments?: Comment[];
    date: Date;
};

export interface PostWithComments extends Post {
    comments: Comment[];
}
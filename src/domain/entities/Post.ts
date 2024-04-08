export interface Post {
    id?: string;
    title: string;
    content: string;
    author: string;
    comments?: Comment[];
    date: Date;
};
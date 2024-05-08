import { IAuthor } from "./IAuthor";

export interface IPostResume {
    id: string;
    title: string;
    content: string;
    author: IAuthor;
    date: string;
}
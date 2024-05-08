import { IAuthor } from "./IAuthor";

export interface IComment {
    id: string;
    content: string;
    author: IAuthor;
    date: string;
}
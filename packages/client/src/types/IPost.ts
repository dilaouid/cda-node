import { IComment } from "./IComment";
import { IPostResume } from "./IPostResume";

export interface IPost extends IPostResume {
    comments: IComment[];
}
import { Row } from "react-bootstrap";
import { IPostResume } from "../../../types/IPostResume";
import { PostResume } from "./PostResume";

interface PostsResumeProps {
    posts: IPostResume[];
}

export const PostsResume: React.FC<PostsResumeProps> = ({ posts }) => {
    return (<Row>
        { posts.map((post: IPostResume) => (
            <PostResume key={post.id} post={post} />
        )) }
    </Row>)
};
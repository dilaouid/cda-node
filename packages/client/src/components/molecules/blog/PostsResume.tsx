import { Row } from "react-bootstrap";
import { IPostResume } from "../../../types/IPostResume";
import { PostResume } from "./PostResume";

interface PostsResumeProps {
    posts: IPostResume[];
}

export const PostsResume: React.FC<PostsResumeProps> = ({ posts }) => {
    return (<Row className="gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
        { posts.length > 0 && posts.map((post: IPostResume) => (
            <PostResume key={post.id} post={post} />
        )) }
        { posts.length == 0 && <p className="text-center">Aucun article à afficher</p> }
    </Row>)
};
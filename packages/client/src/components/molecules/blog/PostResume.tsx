import { Col } from "react-bootstrap";
import { IPostResume } from "../../../types/IPostResume";
import { ReadMore } from "../../atoms/blog/ReadMore";

interface PostResumeProps {
    post: IPostResume;
}

export const PostResume: React.FC<PostResumeProps> = ({ post }) => {
    return (<Col>
        <div className="p-4">
            <h4>{ post.title }</h4>
            <p>{ post.content.slice(0, 100) } ...</p>
            <ReadMore to={`/blog/${post.id}`}>Lire l'article</ReadMore>
            <div className="d-flex">
                <div>
                    <p className="fw-bold mb-0">{ post.author.name }</p>
                    <p className="text-muted mb-0">{ post.date }</p>
                </div>
            </div>
        </div>
    </Col>)
};
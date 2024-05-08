import styled from "styled-components";

import { Card as CD } from "react-bootstrap";
import { IComment } from "../../../types/IComment";
import { useAuthStore } from "../../../store/authStore";

const Card = styled(CD)`
    margin-bottom: 14px;
`;

interface CommentProps {
    comment: IComment;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
    const { user } = useAuthStore();
    if (!comment) return <></>;

    return (
        <Card>
            <Card.Body>
                <Card.Text>{ comment.content }</Card.Text>
                <h6 className="text-muted card-subtitle mb-2">{ comment.author.username }</h6>
                { user && user.id === comment.author.id && <button className="btn btn-danger">Supprimer</button>}
            </Card.Body>
        </Card>
    )
};
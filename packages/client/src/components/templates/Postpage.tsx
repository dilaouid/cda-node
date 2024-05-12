import styled from "styled-components";

import { Container as CN } from "react-bootstrap";
import { IPost } from "../../types/IPost";
import { Comment } from "../molecules/post/Comment";

const Container = styled(CN)`
    margin-top: 43px;
`;

const Author = styled.p`
    margin-bottom: 0px;
`;


interface PostpageProps {
    post: IPost;
}

export const Postpage: React.FC<PostpageProps> = ({ post }) => {
    if (!post) return (<></>);

    return (
        <Container>
            <h1 className="text-center">{post.title}</h1>
            <hr />
            <p>{ post.content }</p>
            <Author className="fw-bold">Par { post.author.username }</Author>
            <p className="text-muted">{ post.date }</p>
            <hr />
            <h3>Commentaires</h3>
            { post.comments && post.comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            )) }
        </Container>
    )
};
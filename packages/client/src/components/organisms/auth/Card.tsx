import { Card as CD, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(CD)`
    border-radius: 44px;
    box-shadow: 0px 0px 20px 3px #f04f453e;
`;

interface CardProps {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <Col md={6} xl={4}>
            <StyledCard className="mb-5">
                <CD.Body className="d-flex flex-column align-items-center">
                    { children }
                </CD.Body>
            </StyledCard>
        </Col>
    );
}
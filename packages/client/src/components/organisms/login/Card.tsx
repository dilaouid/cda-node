import { Card as CD, Col } from "react-bootstrap";
import { Badge } from "../../molecules/login/Badge";
import styled from "styled-components";
import { FormLogin } from "./FormLogin";

const StyledCard = styled(CD)`
    border-radius: 44px;
    box-shadow: 0px 0px 20px 3px #f04f453e;
`;
export const Card = () => {
    return (
        <Col md={6} xl={4}>
            <StyledCard className="mb-5">
                <CD.Body className="d-flex flex-column align-items-center">
                    <Badge />
                    <FormLogin />
                </CD.Body>
            </StyledCard>
        </Col>
    );
}
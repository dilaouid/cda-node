import styled from "styled-components";
import ParallaxImage from '../../../assets/img/parallax.webp';
import { Col, Container, Row } from "react-bootstrap";
import { HeaderResume } from "../../molecules/homepage/HeaderResume";

const StyledParralax = styled.div`
    height: 600px;
    background-image: url(${ParallaxImage});
    background-position: center;
    background-size: cover;
`;

const TransparentBlackColor = styled(Col)`
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 3rem;
`;


export const Header: React.FC = () => {
    return (
        <StyledParralax>
            <Container className="h-100">
                <Row className="h-100">
                    <TransparentBlackColor md={6} className="text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
                        <HeaderResume title={"NodeJS pour les CDA"}>
                            Maîtrisez la formation <strong>NODEJS</strong> ! Avec ce cours hyper bien animé !<br /><br />
                            Participez à l'oral, réussissez le TP final, et vous aurez enfin acquis les fondamentaux de cette technologie !
                        </HeaderResume>
                    </TransparentBlackColor>
                </Row>
            </Container>
        </StyledParralax>
    )
}
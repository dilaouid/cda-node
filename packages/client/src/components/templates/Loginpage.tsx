import { Container, Row } from "react-bootstrap";
import { Header } from "../molecules/login/Header";
import { Card } from "../organisms/login/Card";

export const Loginpage = () => {
    return (<section className="position-relative">
        <Container>
            <Header />
            <Row className="d-flex justify-content-center">
                <Card />
            </Row>
        </Container>
    </section>);
};
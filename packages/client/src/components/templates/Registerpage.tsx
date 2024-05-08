import { Container, Row } from "react-bootstrap";

import { FormRegister } from "../organisms/register/FormRegister";
import { Card } from "../organisms/auth/Card";

import { Header } from "../molecules/register/Header";
import { Badge } from "../molecules/auth/Badge";

export const Registerpage = () => {
    return (<section className="position-relative">
        <Container>
            <Header />
            <Row className="d-flex justify-content-center">
                <Card>
                    <Badge alt={true} />
                    <FormRegister />
                </Card>
            </Row>
        </Container>
    </section>);
};
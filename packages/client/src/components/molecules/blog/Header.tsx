import { Row, Col } from "react-bootstrap";

interface HeaderProps {
    children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
    return (
        <Row className="mb-5">
            <Col md={8} xl={6} className="text-center mx-auto">
                { children }
            </Col>
        </Row>
    );
};

import { Col, Row } from "react-bootstrap";

interface FeaturesHeaderProps {
    children: React.ReactNode;
}

export const FeaturesHeader: React.FC<FeaturesHeaderProps> = ({ children }) => {
    return (
        <Row className="mb-5">
            <Col md={8} xl={6} className="text-center mx-auto">
                { children }
            </Col>
        </Row>
    )
}
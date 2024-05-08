import { Col, Card } from "react-bootstrap";

interface FeatureProps {
    children: React.ReactNode;
}

export const Feature: React.FC<FeatureProps> = ({ children }) => {
    return (
        <Col>
            <Card>
                <Card.Body className="p-4">
                    { children }
                </Card.Body>
            </Card>
        </Col>
    )
}
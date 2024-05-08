import { Row, Col } from "react-bootstrap"

export const Header = () => {
    return (<Row className="mb-5">
        <Col md={8} xl={6} className="text-center mx-auto">
            <h2>S'inscrire</h2>
            <p className="w-lg-50">Pas encore inscrit ? Il est encore possible de rejoindre le meilleur blog, où ont peut faire des choses comme, écrire ou lire des articles (très original)</p>
        </Col>
    </Row> )
}
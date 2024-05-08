import { Row, Col } from "react-bootstrap"

export const Header = () => {
    return (<Row className="mb-5">
        <Col className="text-center mx-auto">
            <h2>Se connecter</h2>
            <p className="w-lg-50">Connectez-vous pour pouvoir rédiger des articles, accéder à la messagerie
                instantanée, et aussi pour tester la fonctionnalité de connexion, quand même !</p>
        </Col>
    </Row> )
}
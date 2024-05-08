import { Container, Row, Card } from "react-bootstrap";
import { FeaturesHeader } from "../../molecules/homepage/FeaturesHeader";
import { Feature } from "../../molecules/homepage/Feature";
import { StyledFeatureImage } from "../../atoms/homepage/FeatureImage";

import features from '../../../data/features.json';

import DrizzleImage from '../../../assets/img/features/drizzle.png';
import TestsImage from '../../../assets/img/features/tests.png';
import WsImage from '../../../assets/img/features/ws.png';

export const Features = () => {
    const images = [
        DrizzleImage,
        TestsImage,
        WsImage
    ]
    return (
        <Container className="py-4 py-xl-5">
            <FeaturesHeader>
                <h2>Programme de la semaine</h2>
                <p className="w-lg-50">On continue le programme. Cette fois-ci, cette semaine sera moins intense, et vous aurez donc plus de temps à consacrer pour le TP final. Moins de stress, mais des notions toujours aussi importantes pour la réalisation d'un bon backend en NodeJS (en restant sur Express (<em>malheureusement, ou pas</em>))</p>
            </FeaturesHeader>
            <Row className="gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                {features.map( (feature, index) => {
                    return (
                        <Feature key={index}>
                            <StyledFeatureImage variant="top" src={images[index]} />
                            <Card.Title>{ feature.title }</Card.Title>
                            <Card.Text>{ feature.description }</Card.Text>
                        </Feature>
                    )
                } )}
            </Row>
        </Container>
    )
};
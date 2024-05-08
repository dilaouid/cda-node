import styled from "styled-components"
import { useState } from "react";

import { Container as CN, Row, Col, Card as CD, Form, Button } from "react-bootstrap"
import { useCreatePost } from "../../hooks/useCreatePost";

const Container = styled(CN)`
    margin-top: -37px;
`;

const Card = styled(CD)`
    background: rgba(40,40,40,0);
`;

export const Createpage: React.FC = () => {
    const [ title, setTitle ] = useState<string>('');
    const [ content, setContent ] = useState<string>('');
    const [ success , setSuccess ] = useState<string>('');
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const createPostMutation = useCreatePost();
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        createPostMutation.mutateAsync({ title, content }).then(() => {
            setSuccess('Article publié avec succès');
            setError('');
        }).catch(err => {
            setError(err.toString());
            setSuccess('');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <section className="position-relative py-4 py-xl-5">
            <Container className="position-relative">
                <Row className="d-flex justify-content-center">
                    <Col xs={7}>
                        <Card className="mb-5">
                            <Card.Body className="p-sm-5">
                                <h2 className="text-center mb-4">Ecrire un article</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Titre</Form.Label>
                                        <Form.Control type="text" placeholder="Titre de l'article" onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contenu</Form.Label>
                                        <Form.Control as="textarea" rows={15} placeholder="Contenu de l'article"  onChange={(e) => setContent(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        Publier
                                    </Button>
                                    {success && <p className="text-success mt-3">{success}</p>}
                                    {error && <p className="text-danger mt-3">{error}</p>}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
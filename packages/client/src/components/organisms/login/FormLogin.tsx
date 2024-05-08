import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "@tanstack/react-router"
import { useLogin } from "../../../hooks/useLogin"

export const FormLogin = () => {
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')

    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        loginMutation.mutateAsync({ username, password }).then(data => {
            console.log(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err.toString())
            setMessage(err.toString())
            setLoading(false);
        });
    };

    return (
        <Form className="text-center" onSubmit={handleSubmit}>
            <div className="text-start mb-3">
                <Form.Group className="mb-3">
                    <Form.Label>Identifiant</Form.Label>
                    <Form.Control type="text" placeholder="KonanEdogawa" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <Button variant="danger" className="d-block w-100" type="submit" disabled={loading}>Se connecter</Button>
                </div>
                { message && <p className="text-danger fw-bold">{message}</p> }
                <Link to={'/register'}>Pas encore inscrit ?</Link>
            </div>
        </Form>
    )
}
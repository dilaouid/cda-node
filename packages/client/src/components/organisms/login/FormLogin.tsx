import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "@tanstack/react-router"

import { useLogin } from "../../../hooks/useLogin"

import { useAuthStore } from "../../../store/authStore"

export const FormLogin = () => {
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')

    const { setUser, toggleAuth } = useAuthStore();
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        loginMutation.mutateAsync({ username, password }).then(data => {
            setUser(data.data.user);
            toggleAuth(true);
            setLoading(false);
            navigate({ to: '/' });
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
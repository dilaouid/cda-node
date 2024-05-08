import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link } from "@tanstack/react-router"

import { useRegister } from "../../../hooks/useRegister"

export const FormRegister: React.FC = () => {
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ confirmPassword, setConfirmPassword ] = useState<string>('')
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<string>('')
    const [ error, setError ] = useState<string>('')

    const registerMutation = useRegister();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        registerMutation.mutateAsync({ username, password, confirmPassword }).then(() => {
            setSuccess('Inscription réussie !');
            setError('');
            setLoading(false);
        }).catch((err) => {
            console.error(err.toString())
            setError(err.toString())
            setSuccess('');
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
                <Form.Group className="mb-3">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <div className="mb-3">
                    <Button variant="danger" className="d-block w-100" type="submit" disabled={loading}>S'inscrire</Button>
                </div>
                { error && <p className="text-danger fw-bold">{ error }</p> }
                { success && <p className="text-success fw-bold">{ success }</p> }
                <Link to={'/login'}>Déjà inscrit ?</Link>
            </div>
        </Form>
    )
}
import { Link, useNavigate } from '@tanstack/react-router';

import { Container, Navbar as RBNavbar, Nav, Button } from 'react-bootstrap';
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";


import { NavbarLogo } from '../atoms/navbar/NavbarLogo';
import NavItem from '../atoms/navbar/NavItem';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useLogout';

export const Navbar = () => {
    const { isAuthenticated, toggleAuth, setUser } = useAuthStore();
    const navigate = useNavigate();

    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutateAsync().then(() => {
            setUser(null);
            toggleAuth(false);
            navigate({ to: '/' });
        });
    }

    return (
        <RBNavbar expand='md' variant='dark' bg='black' sticky='top'>
            <Container>
                <RBNavbar.Brand className='user-select-none'>
                    <Link to="/" className='text-decoration-none text-white'>
                        <NavbarLogo />
                    </Link>
                </RBNavbar.Brand>

                <RBNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <RBNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavItem to="/">Page d'accueil</NavItem>
                        <NavItem to="/blog">Blog</NavItem>
                        { isAuthenticated && <NavItem to="/create">Rédiger un article</NavItem> }
                    </Nav>
                    { isAuthenticated && <Button variant="warning" onClick={handleLogout}><AiOutlineLogout /> | Se déconnecter</Button> }
                    { !isAuthenticated && <Button variant="danger" href="/login"><AiOutlineLogin /> | Se connecter</Button> }
                </RBNavbar.Collapse>
            </Container>
        </RBNavbar>
    )
}
import { Link } from "@tanstack/react-router";
import { Container } from "react-bootstrap";
import { FaGithubAlt } from "react-icons/fa6";

export const Footer = () => {
    return (
    <footer className="text-center">
        <Container className="text-muted py-4 py-lg-5">
            <ul className="list-inline">
                <li className="list-inline-item">
                    <Link className="link-secondary" to="/">Support Moodle</Link>
                </li>
            </ul>

            
            <ul className="list-inline">
                <li className="list-inline-item">
                    <Link className="link-secondary" to="https://github.com/dilaouid/cda-node">
                        <FaGithubAlt />
                    </Link>
                </li>
            </ul>

            
            <p>Copyright © 2024</p>
        </Container>
    </footer>);
}
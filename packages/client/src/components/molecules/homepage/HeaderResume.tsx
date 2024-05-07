import styled from "styled-components";
import { HeaderTitle } from "../../atoms/homepage/HeaderTitle";
import { Button } from "react-bootstrap";

const StyledResume = styled.p`
    font-family: Alata, sans-serif;
`;

interface HeaderResumeProps {
    children: React.ReactNode;
    title: string;
}

export const HeaderResume: React.FC<HeaderResumeProps> = ({ children, title }) => {
    return (
        <div data-aos="zoom-in" data-aos-duration="700">
            <HeaderTitle>{ title }</HeaderTitle>
            <StyledResume className="my-3">{ children }</StyledResume>
            
            <Button className="me-2" size="lg" variant="danger" href="/blog">Voir le blog</Button>
            <Button size="lg" variant="outline-warning" href="/login">Se connecter</Button>
        </div>
    )
}
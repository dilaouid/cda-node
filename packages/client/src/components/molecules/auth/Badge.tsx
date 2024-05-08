import styled from "styled-components"
import { GoPersonFill } from "react-icons/go";

const Icon = styled.div<{ $alt?: boolean }>`
    background: ${props => props.$alt ? 'var(--bs-primary)' : 'var(--bs-danger)'};
    color: var(--bs-white);
    display: flex;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    align-items: center;
    font-size: 2.5rem;
    margin-bottom: 1rem;
`

interface BadgeProps {
    alt?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ alt }) => {
    return (<Icon className="bs-icon-xl bs-icon-circle bs-icon my-4" $alt={alt}>
        <GoPersonFill />
    </Icon>)
}
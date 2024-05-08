import styled from "styled-components";
import { Link } from "@tanstack/react-router";

const ReadMoreStyled = styled(Link)`
    margin-bottom: 16px;
`;

interface ReadMoreProps {
    children: React.ReactNode;
    to: string;
}

export const ReadMore: React.FC<ReadMoreProps> = ({ children, to }) => {
    return (
        <ReadMoreStyled className="btn btn-primary" to={to}>{ children }</ReadMoreStyled>
    );
};
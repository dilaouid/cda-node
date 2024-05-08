import styled from "styled-components";

const AlataTitle = styled.h1`
    font-family: Alata, sans-serif;
`;

const HighlightedTitle = styled.span`
    background-color: rgb(255, 150, 73);
`;

interface HeaderTitleProps {
    children: React.ReactNode;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ children }) => {
    return (
        <AlataTitle className="text-uppercase fw-bold">
            <HighlightedTitle>{ children?.toString().split(" ")[0] }</HighlightedTitle>
            { " " + children?.toString().split(" ").slice(1).join(" ") }
        </AlataTitle>
    )
};
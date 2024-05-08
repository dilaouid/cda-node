import styled from "styled-components"
import { GoPersonFill } from "react-icons/go";

const Icon = styled.div`
    background: var(--bs-orange);
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

export const Badge = () => {
    return (<Icon className="bs-icon-xl bs-icon-circle bs-icon my-4">
        <GoPersonFill />
    </Icon>)
}
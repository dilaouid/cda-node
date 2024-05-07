import styled from 'styled-components';
import Logo from '../../../assets/3wa.svg';

const StyledLogo = styled.img`
    width: 51.552px;
    margin-right: 20px;
`;

export const NavbarLogo = () => {
    return (
        <StyledLogo src={Logo} alt="Logo 3WA" width={51} />
    )
}
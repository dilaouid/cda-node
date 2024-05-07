import React from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const StyledNavItem = styled(Link)`
  margin-right: 30px;
`;

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  if (!children) {
    return null;
  }

  return (
    <li className='nav-item'>
      <StyledNavItem 
        to={to}
        className='nav-link'
        activeProps={{ className: 'active' }}
      >
        { children.toString() }
      </StyledNavItem>
    </li>
  );
};

export default NavItem;
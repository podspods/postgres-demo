import React from "react";
import styled from "styled-components";
import { Menu } from "../Navigation/Menu";
import { flexBetween } from "../../styles/mixins";

const HeaderContainer = styled.header`
  ${flexBetween}
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 800;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.gray700};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/test", label: "Test" },
];

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        MyApp<span>.com</span>
      </Logo>
      <Menu items={menuItems} />
    </HeaderContainer>
  );
};

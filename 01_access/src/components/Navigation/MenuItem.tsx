import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  $isActive?: boolean;
}

export const MenuItem = styled.li`
  margin: 0;
`;

export const MenuLink = styled(NavLink)<MenuItemProps>`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.md};
      text-align: center;
      font-size: ${theme.fontSize.lg};
    }
  `}
`;

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
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
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

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 30px;
  }
`;

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/test", label: "Test" },
];

export type HeaderProps = {};
export default function Header({ ...props }: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoImage src="/TCD-logo.png" alt="TDC Logo" />
        <Logo>
          TDC<span>.com</span>
        </Logo>
      </LogoContainer>
      <Menu items={menuItems} />
    </HeaderContainer>
  );
}

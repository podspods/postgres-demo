import styled, { css } from "styled-components";

interface BurgerButtonProps {
  $isOpen: boolean;
  onClick: () => void;
}

const StyledBurgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  span {
    width: 30px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.gray800};
    border-radius: 10px;
    transition: all ${({ theme }) => theme.transitions.normal};
    transform-origin: 1px;

    ${({ $isOpen }) =>
      $isOpen &&
      css`
        &:first-child {
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }
        &:last-child {
          transform: rotate(-45deg);
        }
      `}
  }
`;

export const BurgerButton: React.FC<BurgerButtonProps> = ({ $isOpen, onClick }) => {
  return (
    <StyledBurgerButton $isOpen={$isOpen} onClick={onClick} aria-label="Menu">
      <span />
      <span />
      <span />
    </StyledBurgerButton>
  );
};

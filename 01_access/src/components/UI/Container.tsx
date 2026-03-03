import styled from "styled-components";
import { containerStyle } from "../../styles/mixins";

export const Container = styled.div`
  ${containerStyle}
`;

export const Section = styled.section<{ $bg?: string }>`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ $bg, theme }) => $bg || "transparent"};
`;

export const Grid = styled.div<{ $cols?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ $gap, theme }) => $gap || theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
  }
`;

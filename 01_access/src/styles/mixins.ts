import { css } from "styled-components";
import { theme } from "./theme";

// Responsive mixins
export const respondTo = {
  xs: (content: any) => css`
    @media (min-width: ${theme.breakpoints.xs}) {
      ${content}
    }
  `,
  sm: (content: any) => css`
    @media (min-width: ${theme.breakpoints.sm}) {
      ${content}
    }
  `,
  md: (content: any) => css`
    @media (min-width: ${theme.breakpoints.md}) {
      ${content}
    }
  `,
  lg: (content: any) => css`
    @media (min-width: ${theme.breakpoints.lg}) {
      ${content}
    }
  `,
  xl: (content: any) => css`
    @media (min-width: ${theme.breakpoints.xl}) {
      ${content}
    }
  `,
  xxl: (content: any) => css`
    @media (min-width: ${theme.breakpoints.xxl}) {
      ${content}
    }
  `,
};

// Flexbox mixins
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

// Grid mixins
export const gridContainer = (columns: number = 12, gap: string = theme.spacing.md) => css`
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: ${gap};
`;

// Typography mixins
export const heading1 = css`
  font-size: ${theme.fontSize["4xl"]};
  font-weight: 700;
  line-height: 1.2;

  ${respondTo.md(css`
    font-size: ${theme.fontSize["3xl"]};
  `)}
`;

export const heading2 = css`
  font-size: ${theme.fontSize["3xl"]};
  font-weight: 600;
  line-height: 1.3;

  ${respondTo.md(css`
    font-size: ${theme.fontSize["2xl"]};
  `)}
`;

// Card mixin
export const cardStyle = css`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};
  transition: box-shadow ${theme.transitions.fast};

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

// Container mixin
export const containerStyle = css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  ${respondTo.lg(css`
    padding: 0 ${theme.spacing.lg};
  `)}
`;

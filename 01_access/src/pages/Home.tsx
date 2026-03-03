import styled from "styled-components";
import { Container, Grid, Section } from "../components/UI/Container";
import { Button } from "../components/UI/Button";
import { cardStyle, heading1 } from "../styles/mixins";

export type HomeProps = {};
// export default function Home({ ...props }: HomeProps) {
//   return (
//     <>
//       <h1>Home</h1>
//     </>
//   );
// }

const Hero = styled.section`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  text-align: center;
`;

const HeroTitle = styled.h1`
  ${heading1}
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.9;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const FeatureCard = styled.div`
  ${cardStyle}
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    color: ${({ theme }) => theme.colors.gray600};
    line-height: 1.6;
  }
`;

// const Home: React.FC = () => {
export default function Home({ ...props }: HomeProps) {
  return (
    <>
      <Hero>
        <Container>
          <HeroTitle>Welcome to Our Application</HeroTitle>
          <HeroSubtitle>
            A modern, responsive web app built with React, TypeScript, and styled-components
          </HeroSubtitle>
          <Button $size="large">Get Started</Button>
        </Container>
      </Hero>

      <Section>
        <Container>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Our Features</h2>
          <Grid $cols={3}>
            <FeatureCard>
              <h3>🚀 Fast Performance</h3>
              <p>Built with Vite for lightning-fast development and production builds</p>
            </FeatureCard>
            <FeatureCard>
              <h3>📱 Responsive Design</h3>
              <p>Mobile-first approach with responsive navigation menu</p>
            </FeatureCard>
            <FeatureCard>
              <h3>🎨 Modern Styling</h3>
              <p>Styled-components for dynamic and maintainable CSS</p>
            </FeatureCard>
            <FeatureCard>
              <h3>🔷 TypeScript</h3>
              <p>Type-safe development with excellent IDE support</p>
            </FeatureCard>
            <FeatureCard>
              <h3>🧭 Easy Navigation</h3>
              <p>Responsive menu with burger button on mobile</p>
            </FeatureCard>
            <FeatureCard>
              <h3>📦 Component-Based</h3>
              <p>Reusable components for consistent UI</p>
            </FeatureCard>
          </Grid>
        </Container>
      </Section>
    </>
  );
}

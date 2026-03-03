import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  p {
    color: ${({ theme }) => theme.colors.gray300};
    line-height: 1.6;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.gray700};
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h4>About Us</h4>
          <p>
            We are a passionate team dedicated to creating amazing web experiences with React,
            TypeScript, and modern technologies.
          </p>
        </FooterSection>
        <FooterSection>
          <h4>Quick Links</h4>
          <p>Home • About • Test • Contact</p>
        </FooterSection>
        <FooterSection>
          <h4>Contact</h4>
          <p>Email: info@myapp.com</p>
          <p>Phone: +33 1 23 45 67 89</p>
          <p>Address: Paris, France</p>
        </FooterSection>
      </FooterContent>
      <FooterBottom>© {currentYear} MyApp. All rights reserved.</FooterBottom>
    </FooterContainer>
  );
};

import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { BurgerButton } from "./BurgerButton";
import { MenuItem, MenuLink } from "./MenuItem";

interface MenuProps {
  items: Array<{ path: string; label: string }>;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const MenuList = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    transition: transform ${({ theme }) => theme.transitions.normal};
    z-index: 1000;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 900;
    animation: fadeIn ${({ theme }) => theme.transitions.fast};
  }
`;

export const Menu: React.FC<MenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Empêcher le scroll quand le menu est ouvert sur mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Nav>
      <BurgerButton $isOpen={isOpen} onClick={toggleMenu} />
      <MenuList ref={menuRef} $isOpen={isOpen}>
        {items.map((item) => (
          <MenuItem key={item.path}>
            <MenuLink to={item.path} onClick={closeMenu}>
              {item.label}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
      <Overlay $isOpen={isOpen} onClick={closeMenu} />
    </Nav>
  );
};

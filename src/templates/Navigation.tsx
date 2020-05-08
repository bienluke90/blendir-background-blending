import React, { useState, useRef } from "react";
import styled from "styled-components";
import theme from "../theme/theme";
import Button from "../components/elements/Button";
import Container from "./Container";
import UseDetectOutside from "../hooks/UseDetectOutside";
import DetectMouseMove from "../hooks/DetectMouseMove";

const NavigationContainer = styled.div`
  display: block;
  ${(p: NavigationContainerProps) =>
    p.hidden &&
    `
    transform: translateY(-100%);
    transition: transform 0.5s;
  `}
  position: absolute;
  min-height: ${theme.nav.height};
  width: 100%;
  top: 0;
  left: 0;
  padding: 15px 15px 0 15px;
  background-color: ${theme.nav.backgroundColor};
  z-index: 9999;
`;

const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${theme.widths.tablet}) {
    flex-direction: row;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  padding: 5px;
  width: 100%;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  ${(p: ButtonsContainerProps) =>
    !p.opened &&
    `
        display: none;
    `}
  @media screen and (min-width: ${theme.widths.tablet}) {
    flex-direction: row;
    margin-left: auto;
    margin-right: 0;
    width: auto;
    ${(p: ButtonsContainerProps) =>
      !p.opened &&
      `
        display: block;
    `}
  }
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  font-weight: bold;
  font-size: 3rem;
  text-shadow: 1px 1px 3px ${theme.colors.textInverted};
  padding: 5px 15px 5px 5px;
  line-height: 3rem;
  @media screen and (min-width: ${theme.widths.tablet}) {
    width: auto;
  }
`;

const Navicon = styled.div`
  position: relative;
  width: 4rem;
  height: 3.4rem;
  padding-top: 3px;
  border-radius: ${theme.borderRadius};
  background: ${theme.colors.text};
  margin-left: auto;
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
  span {
    display: block;
    width: 24px;
    height: 3px;
    margin: 5px 8px;
    border-radius: 2px;
    background-color: ${theme.nav.backgroundColor};
    margin-bottom: 0.5rem;
  }
  p {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    text-shadow: 0 0 0 transparent;
    text-indent: -2px;
  }
  ${(p: NaviconProps) =>
    p.active &&
    `
      span {
        display: none !important;
      }

      p {
        display: block;
        color: #000 !important;
      }
    `}
  @media screen and (min-width: ${theme.widths.tablet}) {
    display: none;
  }
`;

interface ButtonsContainerProps {
  opened?: boolean;
}

interface NaviconProps {
  active?: boolean;
  onClick: () => void;
}

interface NavigationProps {
  showPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
}

interface NavigationContainerProps {
  hidden: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ panel, showPanel }) => {
  const [navOpened, handleOpenNav] = useState(false);
  const [navHidden, handleHideNav] = useState(false);
  const navRef = useRef<HTMLElement>(document.createElement("div")!);

  UseDetectOutside(navRef, handleOpenNav);
  DetectMouseMove(handleHideNav, panel === "playground");

  const handleNav = (close?: boolean) => {
    if (close === true) {
      handleOpenNav(false);
    }
    handleOpenNav(!navOpened);
  };

  return (
    <NavigationContainer hidden={navHidden}>
      <Container>
        <MenuContainer ref={navRef}>
          <Logo>
            <a
              href="/"
              onClick={() => {
                handleNav(false);
                showPanel("playground");
              }}
            >
              Blendir
            </a>
            <Navicon active={navOpened} onClick={() => handleNav()}>
              <span></span>
              <span></span>
              <span></span>
              <p>&#x2715;</p>
            </Navicon>
          </Logo>
          <ButtonsContainer opened={navOpened}>
            <Button
              inverted
              onClick={() => {
                handleNav(false);
                showPanel("playground");
              }}
            >
              Playground
            </Button>
            <Button
              onClick={() => {
                handleNav(false);
                showPanel("presets");
              }}
            >
              Presets
            </Button>
            <Button
              onClick={() => {
                handleNav(false);
                showPanel("blocks");
              }}
              info
            >
              Blocks
            </Button>
            <Button
              inverted
              onClick={() => {
                handleNav(false);
                showPanel("see-code");
              }}
              info
            >
              See code
            </Button>
          </ButtonsContainer>
        </MenuContainer>
      </Container>
    </NavigationContainer>
  );
};

export default Navigation;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContaier = styled.nav`
    width:100vw;
    height: 7em;
    padding: 0 3em;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
`;

export const NavBtn = styled.button`
    border-radius: 50px;
    background: transparent;
    padding: 0.5em 2em;
    color: #fff;
    font-size: 1.6em;
    transition: all 0.2s ease-in-out;
    border: 2px solid #fff;
    position: relative;
    &:hover {
        background: #fff;
        color: #000;
  }
`;

import styled from "styled-components";

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
    z-index: 9;
    flex-wrap: wrap;
    >div{display: flex; width: 33.333%}
    >div:first-child{justify-content: flex-start}
    >div:nth-child(2){justify-content: center;}
    >div:nth-child(3){justify-content: flex-end}
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
    @media screen and (max-width:700px){
        padding: 0.35em 1.3em;
    }
    @media
`;
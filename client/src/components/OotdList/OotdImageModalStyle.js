import styled from "styled-components";

export const OotdImageModalBack = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: .7;
    width: 100%;
    height: 100vh;
    z-index: 998;
`
export const OotdImageModalCont = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 1em 1em 4em 1em;
    box-sizing: border-box;
    width: 33%;

`
export const OotdImageModalImg = styled.img`
    display: block;
    margin: 0 auto;
    z-index: 999;
    background-image: url(${props => props.clickImage});
    box-sizing: border-box;
    width: 100%;
`
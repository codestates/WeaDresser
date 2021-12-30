import styled from "styled-components";
export const OotdListBack = styled.div`
    width: 100%;
    background-color: rgb(236, 234, 245);
`

export const OotdPageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    box-sizing: border-box;
    width: 1800px;
    margin: 0 auto;
    overflow: hidden;
    @media screen and (max-width:1800px){
        width: 1675px;
    }
    @media screen and (max-width:1700px){ // 5 column
        width: 1560px;
    }
    @media screen and (max-width:1600px){
        width: 1460px;
    }
    @media screen and (max-width:1500px){
        width: 1360px;
    }
    @media screen and (max-width:1400px){
        width: 1260px;
    }
    @media screen and (max-width:1300px){
        width: 1160px;
    }
    @media screen and (max-width:1200px){ // 4 column
        width: 1077px;
    }
    @media screen and (max-width:1100px){
        width: 978px;
    }
    @media screen and (max-width:1000px){
        width: 879px;
    }
    @media screen and (max-width:900px){
        width: 780px;
    }
    @media screen and (max-width:800px){ // 3 column
        width: 680px;
    }
    @media screen and (max-width:700px){
        width: 580px;
    }
    @media screen and (max-width:600px){
        width: 480px;
    }
    @media screen and (max-width:500px){ // 2 column
        width: 390px;
    }
    @media screen and (max-width:400px){ // 1 column
        width: 100%;
        padding: 0.15em 1em 0.5em 1em;
    }
`

export const OotdPageTitle = styled.h2`
    text-align: center;
    font-size: 3em;
    color: #000;
`
export const OotdListContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    box-sizing: border-box;
    position: relative;
`

import styled from "styled-components";

export const OotdListBoxContainer = styled.div`
    width: fit-content;
    height: 200px;
    padding-bottom: 100px;
    margin: 0 auto;
    display: inline-block;
`
export const OotdListBoxBack = styled.div`
    width: 20%;
    position: absolute;
    left: calc(100% + 30px);
    box-sizing: border-box;
    padding: 0.3em 0.5em 0.8em 0.5em;
    cursor: pointer;
    margin: 0 auto;
    &:hover{
        .ootd-list-box-item{
            background: #000;
            opacity: 0.5;
        }
        .like-container{
            display: block;
        }
        .diary-user-name{
            display: block;
        }
        .ootd-hashtags{
            display: block;
        }
    }
    @media screen and (max-width:1800px){ // 5 column
        width: 335px;
        padding: 0.2em 0.8em 0.6em 0.8em;
    }
    @media screen and (max-width:1700px){ 
        width: 390px;
        padding: 0.2em 0.8em 0.6em 0.8em;
    }
    @media screen and (max-width:1600px){
        width: 365px;
        padding: 0.2em 0.8em 0.6em 0.8em;
    }
    @media screen and (max-width:1500px){
        width: 340px;
        padding: 0.2em 0.8em 0.6em 0.8em;
    }
    @media screen and (max-width:1400px){
        width: 315px;
        padding: 0.2em 0.8em 0.6em 0.8em;
    }
    @media screen and (max-width:1300px){ // 4 column
        width: 290px;
        padding: 0.2em 0.8em 0.6em 0.8em;
    }
    @media screen and (max-width:1200px){ 
        width: 359px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:1100px){        
        width: 326px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:1000px){
        width: 293px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:900px){ // 3 column
        width: 260px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:800px){ 
        width: 340px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:700px){
        width: 290px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:600px){
        width: 240px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:500px){ // 2 column
        width: 190px;
        padding: 0.2em 0.6em 0.6em 0.6em;
    }
    @media screen and (max-width:400px){ // 1 column
        width: 100%;
        padding: 0.15em 0.4em 0.5em 0.4em;
    }
`
export const OotdListBoxOver = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 1em;
`
export const OotdListBoxImage = styled.img`
    width: 100%;
    display: block;
    border-radius: 1em;
`
export const OotdListBoxItem = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    border-radius: 1em;
`
export const OotdLike = styled.div`
    position: absolute;
    
`
export const DiaryUserName = styled.div`
    position: absolute;
    display: none;
    top: .5em;
    left: .4em;
    color: #fff;
    z-index: 100;
    font-size: 1.6em;
`
export const OotdHashtags =  styled.div`
    position: absolute;
    bottom: 1em;
    right: 1em;
    color: #fff;
    z-index: 100;
    display: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 80%;
`
export const OotdHashtag = styled.div`
    display: inline-block;
    margin-right: .4em;
    font-size: 1.3em;
`
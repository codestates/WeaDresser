import styled from "styled-components";
import { Link } from "react-router-dom";

export const LowerPageContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgb(236, 234, 245);
`
export const LowerPageBox = styled.div`
    width: 60%;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    @media screen and (max-width:1080px){
        width: 75%;
    }
    @media screen and (max-width:800px){
        width: 85%;
    }
`
export const UserWore = styled.div`
    border: 1px solid #cbcbcb;
    width: 48%;
    position: relative;
    padding-bottom: 1em;
    &:hover{
        .ootd-list-box-item{
            border-radius: 0;
            background: #000;
            opacity: 0.5;
        }
        .user-wore-like{
            display: block;
            top: 42%;
        }
    }
`
export const UserWoreImage = styled.div`
    position: relative;
    background-image: url(${props => props.woreUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 30em;
    margin-bottom: 1em;
    cursor: pointer;
`
export const UserWoreText = styled.p`
    font-size: 1.3em;
`
export const BestDresser = styled.div`
    border: 1px solid #cbcbcb;
    width: 48%;
    position: relative;
    &:hover{
        .ootd-list-box-item{
            border-radius: 0;
            background: #000;
            opacity: 0.5;
        }
        .best-ootd-like{
            display: block;
            top: 42%;
        }
    }
`
export const BestDresserImage = styled.div`
    position: relative;
    background-image: url(${props => props.bestUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 30em;
    margin-bottom: 3em;
    cursor: pointer;
`
export const BestDresserText = styled.p`
    font-size: 1.3em;
    text-align: center;
`
export const OotdListBtn = styled(Link)`
    width: 11em;
    height: 1.8em;
    position: absolute;
    bottom: 1em;
    right: 5%;
    font-size: 1.3em;
    display: flex;
    line-height: 1.8em;
    align-items: center;
    color: #2862e5;
    font-size: 1.5em;
    &:hover{
        justify-content: space-between;
        color: #2862e5;
        text-decoration: none;
    }
    >span{
        display: inline-block;
        height: 1.8em;
        line-height: 1.8em;
    }
`
export const RecordBtn = styled(Link)`
    
`
export const NoDataImage = styled.div`
    font-size: 1.2em;
    text-align: center;
    height: 300px;
    line-height: 300px;
    letter-spacing: .3px;
`
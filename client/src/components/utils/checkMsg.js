import React from 'react'
import styled from "styled-components";

const CheckSingMsgBox = styled.div`
    margin-top: .5em;
    width: 100%;
    display: flex;
    justify-content: space-between;
    >div{
        width: 25%;
    }
    @media screen and (max-width:450px){
        padding: .5em 1.3em;
        font-size: .9em;
    }
`
const CheckSingMsgText = styled.p`
    color: rgb(192, 72, 72); font-size: 1.2em;
    width: 70%;
    @media screen and (max-width:600px){
            width: calc(100% - 100px);
    }
`
function CheckSignMsg({message}) {

    return (
        <CheckSingMsgBox>
            <div></div>
            <CheckSingMsgText>{message}</CheckSingMsgText>
        </CheckSingMsgBox>
    )
}

export default CheckSignMsg
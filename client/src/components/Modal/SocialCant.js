import React from 'react'
import styled from "styled-components";
import socialAlert from '../../images/userinfo_social_alert.svg'

const SocialCantContainer = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    width: 285px;
    height: 16em;
    background: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 6px 4px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #cbcbcb;
    >P{
        text-align: center;
        font-size: 1.3em;
    }
    >span{
        display: block;
        top: 1.3em;
        right: 1.5em;
        cursor: pointer;
        width: 1.8em;
        height: 1.8em;
        position: absolute;
        >i{
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1.5px;
            background: #000;
            transition: all .3s;
            transform: rotate(45deg);
        }
        >i:nth-child(2){
            transform: rotate(-45deg);
        }
    }
`
const AlertImage = styled.div`
    width: 48px;
    height: 48px;
    background-image: url(${socialAlert});
    margin: 20px auto;
`

function SocialCant({setCloseSocial}) {

    function closeCondition(e){
        e.preventDefault();
        setCloseSocial(false);
    }
    
    return(
        <>
            <SocialCantContainer>
                <span className="social-close-btn" onClick = {(e) => closeCondition(e)}>
                    <i></i>
                    <i></i>
                </span>
                <AlertImage></AlertImage>
                <p>소셜 로그인 한 사람은<br />회원정보 수정이 불가합니다.<br/>죄송합니다.</p>
            </SocialCantContainer>
        </>
    )
}

export default SocialCant
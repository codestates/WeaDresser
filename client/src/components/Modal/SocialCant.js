import React from 'react'
import styled from "styled-components";
import socialAlert from '../../images/userinfo_social_alert.svg'

const SocialCantContainer = styled.div`
    position: fixed;
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
`
const AlertImage = styled.div`
    width: 48px;
    height: 48px;
    background-image: url(${socialAlert});
    margin: 20px auto;
`

function SocialCant({setShowUpdateModal, showUpdateModal, sucUpdate}) {

    return(
        <>
            <SocialCantContainer>
                <AlertImage></AlertImage>
                <p>소셜 로그인 한 사람은<br />회원정보 수정이 불가합니다.<br/>죄송합니다.</p>
            </SocialCantContainer>
        </>
    )
}

export default SocialCant
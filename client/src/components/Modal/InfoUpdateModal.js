import React from 'react'
import styled from "styled-components";

const UpdateModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background: #000000;
    opacity: .7;
    width: 100%;
    height: 100vh;
    z-index: 1000;
`
const UpdateModalContainer = styled.div`
    position: fixed;
    top: 45%;
    left: 50%;
    z-index: 1001;
    transform: translate(-50%, -50%);
    width: 285px;
    height: 16em;
    background: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 6px 4px 0 rgba(0, 0, 0, 0.1);
    >p{
        font-size: 1.2em;
        text-align: center;
        margin: 4em 0 4em;
    }
    >button{
        display: block;
        margin: 0 auto;
        height: 30px;
        border-radius: 4px;
        color: #fff;
        width: 40%;
        background: #2862e5;
    }
`
const UpdateModalBtn = styled.div`

`

function UpdateModal({setShowUpdateModal, showUpdateModal, sucUpdate}) {

    function closeCondition(){
        if(sucUpdate){
            setShowUpdateModal(false)
        }else{
            setShowUpdateModal(false)
        }
    }
    return(
        <>
            <UpdateModalBackground></UpdateModalBackground>
            <UpdateModalContainer>
            {sucUpdate ? <p>정보 변경이 성공했습니다.</p> : <p>정보 변경이 실패하였습니다 비밀번호를 확인해주세요</p>}
            <button className="update-modal-close-btn"onClick={closeCondition}>
                    닫기
                </button>
            </UpdateModalContainer>
        </>
    )
}

export default UpdateModal
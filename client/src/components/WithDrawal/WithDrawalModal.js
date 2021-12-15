import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import { loginSuccessHandler } from '../../redux/actions/actions'

const WithDrawalModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background: #000000;
    opacity: .7;
    width: 100%;
    height: 100vh;
    z-index: 1000;
`
const WithDrawalModalContainer = styled.div`
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
    >div{
        width: 80%;
        height: 30px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        button{
            border-radius: 4px;
            color: #fff;
            width: 40%;
            background: #7f838e;
        }
        .update-modal-close-btn{
            background: #2862e5;
        }
    }
`
const WithDrawalModalBtn = styled.div`

`

function UpdateModal({setShowWithDrawal}) {
    const dispatch = useDispatch(); 
    const history = useHistory();
    const userData =  useSelector(state => state.isLoginReducer.accessToken)

    function closeCondition(e){
        e.preventDefault();
        setShowWithDrawal(false);
    }
    function withDrawalRequest(e){
        e.preventDefault();
        axios.delete('http://localhost:80/mypage/users', { withCredentials : true})
        .then(res => {
            dispatch(loginSuccessHandler(false, ''));
            history.push('/')
            window.sessionStorage.removeItem('isLogin');
         })
         .catch(err => {
            //  안됐을때 창 띄우기 귀찮음
        })
    }

    return(
        <>
            <WithDrawalModalBackground></WithDrawalModalBackground>
            <WithDrawalModalContainer>
                <p>회원 탈퇴를 하시겠습니까?</p>
                <div>
                    <button onClick={(e) => withDrawalRequest(e)}>
                        네
                    </button>
                    <button className="update-modal-close-btn" onClick={(e) =>closeCondition(e)}>
                        아니오
                    </button>
                </div>
            </WithDrawalModalContainer>
        </>
    )
}

export default UpdateModal
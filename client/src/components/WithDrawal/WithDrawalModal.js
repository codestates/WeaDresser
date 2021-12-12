import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { loginSuccessHandler } from "../../redux/actions/actions";

const WithDrawalModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #000000;
  opacity: 0.7;
  width: 100%;
  height: 100vh;
  z-index: 1000;
`;
const WithDrawalModalContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  padding: 20px 80px;
  box-sizing: border-box;
`;
const WithDrawalModalBtn = styled.div``;

function UpdateModal({ setShowWithDrawal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.isLoginReducer.accessToken);

  function closeCondition(e) {
    e.preventDefault();
    setShowWithDrawal(false);
  }
  function withDrawalRequest(e) {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/mypage/users`, {
        headers: { authorization: `Bearer ${userData}`, withCredentials: true },
      })
      .then((res) => {
        dispatch(loginSuccessHandler(false, ""));
        history.push("/");
      })
      .catch((err) => {});
  }

  return (
    <>
      <WithDrawalModalBackground></WithDrawalModalBackground>
      <WithDrawalModalContainer>
        <p>회원 탈퇴를 하시겠습니까?</p>
        <button onClick={(e) => withDrawalRequest(e)}>확인</button>
        <button
          className="update-modal-close-btn"
          onClick={(e) => closeCondition(e)}
        >
          취소
        </button>
      </WithDrawalModalContainer>
    </>
  );
}

export default UpdateModal;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import axios from "axios";
import title from "./title.svg";
import {
  LoginContainer,
  LogoContainer,
  InputContainer,
  LoginError,
  LoginBtnContainer,
} from "./LoginStyle";
import { CloseModalButton } from "./ModalStyle";
import { getGoogleAccToken, getKakaoCode } from "../../../api/social";
import {
  isShowLoginModalHandler,
  isShowSignUpModalHandler,
  loginSuccessHandler,
} from "../../../redux/actions/actions";
import { useSpring } from "react-spring";
import { SignupContainer } from "./SignupStyle";

function Login({ closeModalByBtn }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { isShowLoginModal, isShowSignUpModal } = useSelector(
    (state) => state.isShowModalReducer
  );

  const [active, setActive] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  // Translate animation (Signin)
  const props = useSpring({
    transform: isShowLoginModal ? "translateY(0%)" : "translateY(100%)",
    opacity: isShowLoginModal ? 1 : 0,
  });
  // Translate animation (Signup)
  const props2 = useSpring({
    transform: isShowSignUpModal ? "translateX(0%)" : "translateX(100%)",
    opacity: isShowSignUpModal ? 1 : 0,
  });

  // inputvalue save to the loginInfo States
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    setErrorMessage("");
  };
  // On backSpace key => active false
  const handleKeyPress = (e) => {
    if (e.key === "Backspace") setActive("");
  };
  // validition : email=null, password=Null, email regx@
  // !Todo  정규식 추가
  const validCheckHandler = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setActive("");
      setErrorMessage("이메일 과 패스워드를 입력해 주세요");
    } else if (!email.includes("@")) {
      setErrorMessage("이메일 형식을 확인해 주세요");
    } else {
      // GET user Access Token from server
      setActive("-active"); // button active
      userLoginHandler(); // * login ajax call
    }
  };
  // GET User info by request to 80 Server
  const userLoginHandler = async () => {
    const { email, password } = loginInfo;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/users/signin`,
        // `${process.env.REACT_APP_SERVER_URL}/users/signin`,
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        // isLogin =true & set the accessToken + page redirection
        dispatch(loginSuccessHandler(true, result.data.accessToken));
        dispatch(isShowLoginModalHandler(false));
        history.push("/");
      })
      .catch((err) => {
        dispatch(loginSuccessHandler(false, ""));
        if (err.response.status === 403) {
          setErrorMessage("회원이 아닙니다. 회원 가입을 진행해 주세요");
        } else if (err.response.status === 401) {
          setErrorMessage("이메일 비밀번호가 일치하지 않습니다.");
        } else {
          setErrorMessage("앗! 서버 error가 낫어요!");
        }
      });
  };
  const googleLoginHandler = () => {
    getGoogleAccToken();
  };
  const kakaoLoginHandler = () => {
    getKakaoCode();
  };
  const modalChangeHandler = () => {
    dispatch(isShowSignUpModalHandler(true));
  };
  return (
    <>
      {isShowSignUpModal ? (
        <LoginContainer style={props2}>
          <Signup closeModalByBtn={closeModalByBtn} />
        </LoginContainer>
      ) : (
        <LoginContainer style={props}>
          <LogoContainer>
            <img alter="" src={title} />
          </LogoContainer>
          <InputContainer>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              onChange={handleInputValue("email")}
              onKeyUp={handleKeyPress}
            />
            <input
              className="login-input"
              type="password"
              placeholder="비밀번호"
              onChange={handleInputValue("password")}
              onKeyUp={handleKeyPress}
            />
            <LoginError>{errorMessage}</LoginError>
          </InputContainer>
          <LoginBtnContainer>
            <button
              onClick={validCheckHandler}
              className={`login-btn${active}`}
            >
              {" "}
              로그인
            </button>
            <button onClick={modalChangeHandler} className="singup-btn">
              회원가입
            </button>
            <button onClick={kakaoLoginHandler} className="kakao-btn">
              Kakao
            </button>
            <button onClick={googleLoginHandler} className="google-btn">
              Google
            </button>
          </LoginBtnContainer>
          <CloseModalButton onClick={closeModalByBtn} />
        </LoginContainer>
      )}
    </>
  );
}
export default Login;

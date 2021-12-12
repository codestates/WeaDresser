import React, { useCallback, useRef, useState, useEffect } from "react";
import { useSpring } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Login from "./Login";
import { getGoogleUserInfo, getKakaoAccToken } from "../../../api/social";
import {
  isShowLoginModalHandler,
  loginSuccessHandler,
  isShowSignUpModalHandler,
} from "../../../redux/actions/actions";
import { ModalBackdrop } from "./ModalStyle";
import { useHistory } from "react-router";

const Modal = ({ setGoHomeNow }) => {
  const { isShowLoginModal } = useSelector((state) => state.isShowModalReducer);
  const [socialDone, setSocialDone] = useState(false);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const history = useHistory();

  // Translate animation by useSpring
  const props = useSpring({
    transform: isShowLoginModal ? "translateY(0%)" : "translateY(100%)",
    opacity: isShowLoginModal ? 1 : 0,
  });

  // Modal False by clx btn
  const closeModalByBtn = (e) => {
    dispatch(isShowLoginModalHandler(false));
    dispatch(isShowSignUpModalHandler(false));
  };
  // Modal False by backDrop <- useRef only
  const closeModalHandler = (e) => {
    if (modalRef.current === e.target) {
      dispatch(isShowLoginModalHandler(false));
      dispatch(isShowSignUpModalHandler(false));
    }
  };
  // Modal False by Esc key <- useCallback only!!
  const closeKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && isShowLoginModal) {
        dispatch(isShowLoginModalHandler(false));
        // dispatch(isShowSignUpModalHandler(false))
      }
    },
    [isShowLoginModalHandler, isShowLoginModal]
  );

  // useEffect to set keydown event
  useEffect(() => {
    document.addEventListener("keydown", closeKeyPress);
    return () => document.removeEventListener("keydown", closeKeyPress);
  }, [closeKeyPress]);

  // Get google userinfo & cookie token
  const googleTokenHandler = async (goolgeAccToken) => {
    const googleUser = await getGoogleUserInfo({ accessToken: goolgeAccToken });
    const { name, email } = googleUser.data;
    // axios.post("http://localhost:80/oauth/google",
    const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:80";
    axios
      .post(
        `${SERVER}/oauth/google`,
        { email, userName: name },
        { withCredentials: true }
      )
      .then((loginResult) => {
        dispatch(loginSuccessHandler(true, loginResult.data.accessToken));
        setSocialDone(true);
        history.push("/"); //! 구글 auth 성공시 back => 다시 구글 로그인 page
        // home으로 우선 랜더링
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  // Get kakao userinfo & cookie token
  const kakaoTokenHandler = async (kakaoCode) => {
    const kakaToken = await getKakaoAccToken(kakaoCode);
    const { accessToken } = kakaToken;
    const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:80";
    axios
      .post(`${SERVER}/oauth/kakao`, { accessToken }, { withCredentials: true })
      .then((loginResult) => {
        dispatch(loginSuccessHandler(true, loginResult.data.accessToken));
        setSocialDone(true);
        history.goBack();
      })
      .catch((err) => {
        //err handle
        console.log(err.response);
      });
  };
  // useEffect to call API for social login
  useEffect(() => {
    // only if authen by user from Oauth-website
    if (!socialDone) {
      // To check redirect para from social user
      const url = new URL(window.location.href);
      const googleAccToken = url.hash.split("=")[1];
      const kakaoCode = url.searchParams.get("code");

      // get social users token and info (only if appropriate para in url)
      if (googleAccToken) googleTokenHandler(googleAccToken);
      if (kakaoCode) kakaoTokenHandler(kakaoCode);
    }
    return () => {
      //clear effect
      setSocialDone(true);
    }; // dependency for not changing
  }, [socialDone]);
  // moved by App.js

  return (
    <>
      {!isShowLoginModal ? null : (
        <ModalBackdrop style={props} ref={modalRef} onClick={closeModalHandler}>
          <Login
            setGoHomeNow={setGoHomeNow}
            closeModalByBtn={closeModalByBtn}
          />
        </ModalBackdrop>
      )}
    </>
  );
};

export default Modal;

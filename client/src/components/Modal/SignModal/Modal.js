import React,{ useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login'
import Signup from "./Signup";
import { isShowLoginModalHandler, isShowSignUpModalHandler } from '../../../redux/actions/actions'
import { ModalBackdrop } from './ModalStyle'
import { ModalSlider } from "./useSlider";
import { useHistory } from "react-router";
import { useLoginApi} from '../../../utils/api/useLoginApi'
require('dotenv').config()

const Modal = ({ setGoHomeNow }) => {
  const { isShowLoginModal, isShowSignUpModal } = useSelector(state => state.isShowModalReducer)
  const dispatch = useDispatch();
  const { displayLogin, displaySignup } = ModalSlider();
  const { 
    getKakaoAccToken, handleKakaoLoginApi, 
    getGoogleUserInfo, handleGoogleLoginApi,
  } = useLoginApi();
  const history = useHistory();
  const modalRef = useRef();

  // Modal False by clx btn 
  const closeModalByBtn = e => {
    dispatch(isShowLoginModalHandler(false))
    dispatch(isShowSignUpModalHandler(false))
  }
  // Modal False by backDrop <- useRef only 
  // *  close Only Login modal by BackDrop
  const closeModalByBackDrop = e => {
    if(modalRef.current === e.target){
      dispatch(isShowLoginModalHandler(false))
      // dispatch(isShowSignUpModalHandler(false))
    }
  }
  // Modal False by Esc key <- useCallback only!! 
  const closeKeyPress = useCallback( e => {
    if(e.key === 'Escape' && isShowLoginModal){
      dispatch(isShowLoginModalHandler(false))
    }
  }, [dispatch, isShowLoginModal])

  // Switch to Signup component from Login
  const modalChangeHandler = () => {
    dispatch(isShowLoginModalHandler(false));
    dispatch(isShowSignUpModalHandler(true));
  }

  // set keydown event 
  useEffect( ()=> {
    document.addEventListener('keydown', closeKeyPress);
    return () => document.removeEventListener('keydown', closeKeyPress)
  }, [closeKeyPress])

  //* 구글 유저 로그인 요청 Done
  const googleTokenHandler = async (goolgeAccToken) => {
    const googleUser = await getGoogleUserInfo({accessToken : goolgeAccToken});
    const { name, email } = googleUser.data
    await handleGoogleLoginApi(email, name)
      
    const redirect = new URL(sessionStorage.getItem('redirect')).pathname
    sessionStorage.removeItem('redirect')
    history.push(redirect)
    // window.location.assign(redirect) // ! coockie 사라짐
  }

  // * 카카오 유저 로그인 요청  Done! 
  const kakaoTokenHandler = async (kakaoCode) => {
    const kakaToken = await getKakaoAccToken(kakaoCode);
    const { accessToken } = kakaToken
    await handleKakaoLoginApi({accessToken})

    const redirect = new URL(sessionStorage.getItem('redirect')).pathname
    sessionStorage.removeItem('redirect')
    history.push(redirect)
    // window.location.assign(redirect) // ! cookie 사라짐
  }

  // * set for which to call either of google or kakao 
  useEffect(()=>{ 
    let onlyOnce = true ;
    if(onlyOnce){ // only if authen by user from Oauth-website
      const url = new URL(window.location.href)
      const googleAccToken = url.hash.split("=")[1]
      const kakaoCode = url.searchParams.get("code")
      // get social users token and info (only if appropriate para in url)  
      if(googleAccToken) googleTokenHandler(googleAccToken);
      if(kakaoCode) kakaoTokenHandler(kakaoCode);
    }
    return () => { //clear effect => warning, cant help it 
      onlyOnce =false; // for sure that it's called once on render
    }
  },[]) 

  return (
    <>{ isShowLoginModal ? 
      <ModalBackdrop ref={modalRef} onClick={closeModalByBackDrop}>
        <Login 
         displayLogin={displayLogin} 
         setGoHomeNow = {setGoHomeNow} 
         closeModalByBtn={closeModalByBtn} 
         modalChangeHandler={modalChangeHandler}/>
      </ModalBackdrop>
      : isShowSignUpModal &&
      <ModalBackdrop >
        <Signup 
          displaySignup={displaySignup} 
          closeModalByBtn={closeModalByBtn}/> 
      </ModalBackdrop>  
    }</>
  )
};

export default Modal
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isShowLoginModalHandler, loginSuccessHandler } from '../../redux/actions/actions'
import { useForm } from '../useForm';
require('dotenv').config();
//!Todo Client id, Secret key,숨기기... dot env 안될 수 있음 

export const useLoginApi = () => {
  const [ socialDone, setSocialDone ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ active, setActive ] = useState("");
  const { pattern } = useForm();
  const dispatch = useDispatch();

  // 구글 토큰 요청 
  // * doble check ok
  // ! dot env check point 
  const getGoogleAccToken = () => {
    sessionStorage.setItem('redirect',window.location.href)
    console.log(window.location.href)
    const client_id = process.env.REACT_APP_KEY_GOOGLE
    const redirect_uri = process.env.REACT_APP_REDIRECT_URL
    const google= `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`
    window.location.assign(google)
  };

  //구글 유저 정보 조회 요청  
  // * double check ok 
  const getGoogleUserInfo = async ({accessToken}) => {
    const googleData = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, 
      { headers: { 
        authorization: `token ${accessToken}`, 
        accept: 'application/json' 
        }
      })
    .catch(err => {
      console.log(err);
      return { isSuccess : false, accessToken : null , msg : "Server error"} 
    })
    return googleData 
      ? { isSuccess : true, data : googleData.data, msg : "Success" }
      : { isSuccess : false, data : null, msg : "Bad Requset" }

  };
    
  //구글 유저 로그인 요청 
  // * double check ok 
  // ! dot env check point 
  const handleGoogleLoginApi = async (email, name ) => {
    const SERVER = process.env.REACT_APP_SERVER_URL
    axios.post(`${SERVER}/oauth/google`, 
      { email : email, userName : name }, 
      { withCredentials : true }
    )
  . then(loginResult => {
      dispatch(loginSuccessHandler(true, loginResult.data.accessToken));
      setSocialDone(true);
      sessionStorage.setItem('isLogin', 'true')
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  // 카카오 코드 요청 
  // * double check ok 
  // ! dot env check point 
  const getKakaoCode = () => {
    sessionStorage.setItem('redirect', window.location.href)
    const client_id = process.env.REACT_APP_KEY_KAKAO 
    const redirect_uri= process.env.REACT_APP_REDIRECT_URL 
    const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.assign(kakao)
  };

  // 카카오 토큰 요청 (카카오 유저 정보 서버에서 다시 재요청 확인)
  // * double check ok
  // ! dot env check point 
  const getKakaoAccToken = async (kakaoCode) => {
    const client_id = process.env.REACT_APP_KEY_KAKAO
    const client_secret = process.env.REACT_APP_KAKAO_SECRET
    const redirect_uri= process.env.REACT_APP_REDIRECT_URL 
    const kakaoUrl = `https://kauth.kakao.com/oauth/token?code=${kakaoCode}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`;
    
    const data = await axios.post(
      kakaoUrl,
      { headers: { accept: `application/x-www-form-urlencoded` } },
      { property_keys: ["kakao_account.email"] }
    )
    .catch(err =>{
      // console.log(err);
      return { isSuccess : false, accessToken : null , msg : "Server error"} 
    })
    return data 
      ? { isSuccess : true ,  accessToken : data.data.access_token, msg : "Success" }
      : { isSuccess : false, accessToken : null, msg : "Bad Request" }
  }
  // 카카오 유저 로그인 토큰 요청
  // * double check ok
  // ! dot env check point 
  const handleKakaoLoginApi = async ({accessToken}) => {
    const SERVER = process.env.REACT_APP_SERVER_URL
    axios.post(
      `${SERVER}/oauth/kakao`,
      { accessToken }, // 카카오 토큰
      { withCredentials : true }
    )
    .then(loginResult => {
      dispatch(loginSuccessHandler(true, loginResult.data.accessToken));
      setSocialDone(true);
      sessionStorage.setItem('isLogin', 'true')
      // history.goBack();
    })
    .catch(err=> {
      //err handle
      console.log(err.response);
    })
  }
  // 일반 유저 로그인 토큰 요청 
  // * double check ok
  // ! dot env check point 
  const handleUserLoginApi = async ({ email, password }) => {
    const SERVER = process.env.REACT_APP_SERVER_URL
    axios.post(
      SERVER + "/users/signin",
      // `${process.env.REACT_APP_SERVER_URL}/users/signin`,
      { email, password },
      { withCredentials: true }
    )
    .then(result => {
      // isLogin =true & set the accessToken + page redirection
      dispatch(loginSuccessHandler(true, result.data.accessToken));
      sessionStorage.setItem('isLogin', 'true')
      dispatch(isShowLoginModalHandler(false))
      // history.push('/')
    })
    .catch(err =>{
      dispatch(loginSuccessHandler(false, ""));
      if(err.response.status === 403){
        setErrorMessage("회원이 아닙니다. 회원 가입을 진행해 주세요")
      }
      else if(err.response.status === 401){
        setErrorMessage("이메일 비밀번호가 일치하지 않습니다.")
      }
      else{
        setErrorMessage("앗! 서버 error가 낫어요!")
      }
    })
  }

  // validition : email=null, password=Null, email regx@ 
  const validCheckHandler = (loginInfo) => {
    const { email, password } = loginInfo

    setActive("")
    if(!email){
      setErrorMessage('이메일를 입력해 주세요')
    }
    else if( !pattern.test(email) || !email.includes('@') || !email.includes('.') ){
      setErrorMessage("이메일 형식을 확인해 주세요")
    }
    else if(!password){
      setErrorMessage('비밀번호를 입력해 주세요')
    }
    //! 6자리 이상 으로 교체
    else if(password.length < 6){
      setErrorMessage('6자리 이상 비밀번호를 입력해 주세요')
    }
    else{
      setActive("-active") // button active
      // userLoginHandler() // * login ajax call
      handleUserLoginApi({ email, password})
    }
  };

  return {
    socialDone, setSocialDone, errorMessage, setErrorMessage, active, setActive,
    getGoogleAccToken, getGoogleUserInfo, getKakaoCode, getKakaoAccToken, 
    handleKakaoLoginApi, handleGoogleLoginApi, handleUserLoginApi,
    validCheckHandler
  }
}

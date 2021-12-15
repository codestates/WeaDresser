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
    const client_id = process.env.REACT_APP_KEY_GOOGLE || "218465323122-rtk87nvtaj2j5qmdg72qvas9sj81jee0.apps.googleusercontent.com";
    const redirect_uri = process.env.REACT_APP_REDIRECT_URL || "https://localhost:3000"
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
    const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:80"
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
    const kakaoUrl = `https://kauth.kakao.com/oauth/token?code=${kakaoCode}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=https://localhost:3000&grant_type=authorization_code`;
    
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
    const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:80"
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
    const SERVER = process.env.REACT_APP_SERVER_URL || 'http://localhost:80'
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
    else if(password.length < 3){
      setErrorMessage('3자리 이상 비밀번호를 입력해 주세요')
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


    // 1. 서버는 카카오 토큰을 받고 카카오 oauth 에 유저 정보를 요청 
    // 2. 해당 유저 정보를 받아와서, 유저 valid (있는지 확인) 
    // => 있으면 id+ email 로 토큰 쿠키 전송 
    // => 없으면 유저 새로 생성 ! 이경우 클라이언트는 로그인 창으로 보냄 
    // 3. 로그인 성공시 처리 상황 
    //  => 서버 : accessToekn 쿠키 전송, (바디로도 전송중) ,  
    //  => 클라이언트 : state 값 변경 
    //    =>  is Login = true,  accessToken = 저장  
    //    => session storage isLogin : true 설정 
    //    => (물론 쿠키에 토큰 존재)

    // axios.post(
    //   `${SERVER}/oauth/kakao`,
    //   { accessToken }, // 카카오 토큰
    //   { withCredentials : true }
    // )
    // .then(loginResult => {
    //   dispatch(loginSuccessHandler(true, loginResult.data.accessToken));
    //   setSocialDone(true);
    //   sessionStorage.setItem('isLogin', 'true')
    //   history.goBack();
    //   // Todo : 새로 고침시 주의 사항 + 세션에서 isLogin을 확인 해줘야함 
    //   // redirect code 주소가 떠있으면 새로고침시 다시 카카오 oauth 요청이 가게 됨 
    //   // => 이때 kakao 측에서 이미 토큰 발급된 코드로 토큰 요청하기에 invalid 시켜서 404 가나게됨
    
    //   // Todo : sessionStorage 확인으로 페이지 , 컴포넌트 마다  추가 작업이  필요 있음 
    //   // [goback 시켜서 redirect 주소가 url에 사라지게 해놓은 상태]
    //   // login 상태값이 뒤로가기 되서 false 이기 때문에 버튼이 로그아웃으로 바뀌지 않는 상황 
    //   // 쿠키 와 세션에서는 로그인 확인 가능 한 상황
    //   // ! 유의 사항 케이스
    //   // 이런 상황이 계속 발생 할 수 있음 (구글 유저 ) 또는 유저가 로그인 후 바로 뒤로가기 클릭시 
    //   // state로 isLogin true 확인이 안되서 오류가 뜰 가능성 존재
    //   // 반대로 로그아웃 하고 뒤로 가기 하면 로그인 상태가 뒬 수 있는 등 
    // })
    // .catch(err=> {
    //   //err handle
    //   console.log(err.response);
    // })


    // const getUserAccToken = (loginInfo) => {
    //   const { email, password } = loginInfo; 
    //   axios.post(
    //     'http://localhost:80/users/signin',
    //     { email, password},
    //     { withCredentials: true }
    //   )
    //   .then(data => { 
    //     // console.log(data)
    //     return [ true ,  data.data.accessToken,  "Success" ]
    //   })
    //   .catch(err => {
    //       // console.log(err.response)
    //       return err.response.status === 401 
    //       ? [ false,  null,  "이메일 과 비밀번호를 다시 확인해 주세요" ]  
    //       : [ false,  null ,  "Server error" ] 
    //     })
    // }
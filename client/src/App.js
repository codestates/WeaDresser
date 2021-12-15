
   
// import React, { useEffect, useState } from "react";
import './styles/reset.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { isLoginHandler, isShowLoginModalHandler, isShowSignUpModalHandler } from './redux/actions/actions'
import LoadingIndicator from './components/Loading/LoadingIndicator'
import NavBar from "./components/NavBar/NavBar"

import OotdListPage from "./pages/OotdPage/OotdListPage"
// import {SolidHeart} from "./components/SvgIcon/SvgIcon"
// import Login from "./components/Modal/slideModal/Login"
// import Signup from "./components/Modal/slideModal/Signup"
import LandingPage from './pages/LandingPage/LandingPage';
import {SolidHeart} from "./components/SvgIcon/SvgIcon"
import Modal from "./components/Modal/SignModal/Modal"
// import RecordPage from './pages/RecordPage/RecordPage';
import MyPage from './pages/MyPage/MyPage'
import { loginSuccessHandler } from './redux/actions/actions';
// import styled from 'styled-components';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import RecordPage from './pages/RecordPage/RecordPage';
import Footer from './components/Footer/Footer'
import { useCallback, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config();

function App() {
  const { accessToken } = useSelector(state => state.isLoginReducer)
  const dispatch = useDispatch();
  const loginStateHandler = useCallback( bool =>
    dispatch(loginSuccessHandler(bool, accessToken)), [dispatch, accessToken] )
  const history = useHistory();

  useEffect( ()=> {
    if(sessionStorage.getItem('isLogin')) loginStateHandler(true)
  }, [loginStateHandler])


  const logoutHandler = async () => {
    const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:80"
    await axios.post(SERVER + "/users/signout")
      .then( result => {
        dispatch(loginSuccessHandler(false, ""))
        sessionStorage.removeItem('isLogin')
        history.push('/')
        //! url 변경은 되나 컴포넌트가 ladning page로 가지 않음 ! 
        window.location.assign('https://localhost:3000') // <- 강제 home 
      })
      .catch( err => {
        console.log(err) // err handler
      })
    // history.push('/')
    // 
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar logoutHandler={logoutHandler}/>
        {/* <UserInfo/> */}
        <Switch>
          <Route exact path = '/'><LandingPage /></Route>
          <Route path = '/mypage'><MyPage /></Route>
          <Route path = '/ootd-list'><OotdListPage /></Route>
          <Route path = '/record'><RecordPage /></Route>
        </Switch>
        <Modal/>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
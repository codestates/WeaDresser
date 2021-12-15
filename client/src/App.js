
   
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
import SideBar from './components/SideBar/SideBar'
import {SolidHeart} from "./components/SvgIcon/SvgIcon"
import Modal from "./components/Modal/SignModal/Modal"
// import RecordPage from './pages/RecordPage/RecordPage';
import MyPage from './pages/MyPage/MyPage'
import { loginSuccessHandler } from './redux/actions/actions';
// import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecordPage from './pages/RecordPage/RecordPage';
import DiaryPage from './pages/MyPage/DiaryPage';
import Footer from './components/Footer/Footer'
import { useCallback, useEffect } from 'react';
require('dotenv').config();

function App() {
  const { accessToken } = useSelector(state => state.isLoginReducer)
  const dispatch = useDispatch();
  const loginStateHandler = useCallback( bool =>
    dispatch(loginSuccessHandler(bool, accessToken)), [dispatch, accessToken] )
  
  useEffect( ()=> {
    if(sessionStorage.getItem('isLogin')) loginStateHandler(true)
  }, [loginStateHandler])

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <SideBar />
        {/* <UserInfo/> */}
        <Switch>
          <Route exact path = '/'><LandingPage /></Route>
          <Route path = '/mypage'><MyPage /></Route>
          <Route path = '/ootd-list'><OotdListPage /></Route>
          <Route path = '/record'><RecordPage /></Route>
        </Switch>
        <Modal/>
        {/* <DiaryPage /> */}
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
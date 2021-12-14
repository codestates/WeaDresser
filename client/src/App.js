
   
import React, { useEffect, useState } from "react";
import './styles/reset.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { isLoginHandler, isShowLoginModalHandler, isShowSignUpModalHandler } from './redux/actions/actions'
import LoadingIndicator from './components/Loading/LoadingIndicator'
import NavBar from "./components/NavBar/NavBar"

import OotdListPage from "./pages/OotdPage/OotdListPage"
// import {SolidHeart} from "./components/SvgIcon/SvgIcon"
import Login from "./components/Modal/slideModal/Login"
import Signup from "./components/Modal/slideModal/Signup"
import LandingPage from './pages/LandingPage/LandingPage';
import SideBar from './components/SideBar/SideBar'
import {SolidHeart} from "./components/SvgIcon/SvgIcon"
import Modal from "./components/Modal/slideModal/Modal"
// import RecordPage from './pages/RecordPage/RecordPage';
import MyPage from './pages/MyPage/MyPage'
import { isShowLoginModalHandler } from './redux/actions/actions';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecordPage from './pages/RecordPage/RecordPage';
import DiaryPage from './pages/MyPage/DiaryPage';
import Footer from './components/Footer/Footer'
require('dotenv').config();

function App() {
  const { isLogin, accessToken } = useSelector(state => state.isLoginReducer)
  const { isShowLoginModal, isShowSignUpModal 
  } = useSelector(state => state.isShowModalReducer);
  const dispatch = useDispatch();

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
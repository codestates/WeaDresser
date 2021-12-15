import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { isLoginHandler, isShowLoginModalHandler, isShowSignUpModalHandler, sideBarHandler} from '../../redux/actions/actions'
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
   
const SideBarContainer = styled.aside`
    width: 3em;
    height: 3em;
    position: relative;
    z-index: 99999999;
    border-radius: 50%;
    display: ${props => props.display};
    >span{
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        overflow: hidden;
        width: 50%;
        height: 50%;
        position: absolute;
        >i{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #fff;
            transition: all .3s;
        }
        >i:nth-child(2){
            top: calc(50% - 1px)
        }
        >i:nth-child(3){
            top: calc(100% - 2px);
        }
    }
    >div{
        position: absolute;
        top: 100%;
        left: 7.5px;
        height: 0;
        overflow: hidden;
        opacity: .8;
        >ul{
            background: #6990ea;
            >li{
                border-bottom: 1px solid #fff;
                white-space: nowrap;
                padding: 5px;
                >.side-bar-link{
                    font-size: 1.8em;
                    color: #fff;
                    &:hover{
                        color: #ffe100
                    }
                }
            }
            >li:last-child{
                border: none;
            }
        }
    }
`

function SideBar({position, top, left, display}) {

    const dispatch = useDispatch()
    const sideBarSpreadHandler = (handle) => {dispatch(sideBarHandler(handle))}
    const isShowSideBar = useSelector(state => state.isShowSideBarReducer.isShowSideBar)
    const { isLogin } = useSelector(state => state.isLoginReducer);

    const sideBarSpread = () => {
        // let SideBarContainer = document.querySelector('.side-bar-container')
        let sideBarBtn = document.querySelector('.side-bar-btn')
        let sideBarMenu = document.querySelector('.side-bar-menu');

        if(isShowSideBar === false){
            sideBarSpreadHandler(true)
            sideBarBtn.children[0].style.transform="rotate(-405deg)";
            sideBarBtn.children[0].style.top="44%";
            sideBarBtn.children[1].style.left="100%";
            sideBarBtn.children[2].style.transform="rotate(-495deg)";
            sideBarBtn.children[2].style.top="0.65em"
            sideBarMenu.style.transition = "all .3s";
            sideBarMenu.style.height = "150px";
        }
        else if(isShowSideBar === true){
            sideBarSpreadHandler(false)
            sideBarBtn.children[0].style.transform="rotate(0)";
            sideBarBtn.children[0].style.top="0px";
            sideBarBtn.children[1].style.left="0px";
            sideBarBtn.children[2].style.transform="rotate(0)";
            sideBarBtn.children[2].style.top="calc(100% - 2px)"
            sideBarMenu.style.transition = "all .3s";
            sideBarMenu.style.height = "0px";
        }
    }

    const loginHandler = () => {
        dispatch(isShowLoginModalHandler(true));
        let sideBarBtn = document.querySelector('.side-bar-btn')
        let sideBarMenu = document.querySelector('.side-bar-menu');
        if(isShowSideBar === true){
            sideBarSpreadHandler(false)
            sideBarBtn.children[0].style.transform="rotate(0)";
            sideBarBtn.children[0].style.top="0px";
            sideBarBtn.children[1].style.left="0px";
            sideBarBtn.children[2].style.transform="rotate(0)";
            sideBarBtn.children[2].style.top="calc(100% - 2px)"
            sideBarMenu.style.transition = "all .3s";
            sideBarMenu.style.height = "0px";
        }
    }

    return (
        <>
            <SideBarContainer position={position} top={top} left={left} display={display} className="side-bar-container">
                <span className="side-bar-btn" onClick = {() => sideBarSpread()}>
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
                <div className="side-bar-menu">
                    <ul>
                        {isLogin ? <li><Link onClick = {() => sideBarSpread()} className="side-bar-link" to="/mypage">MyPage</Link></li> : <li><Link onClick = {() => loginHandler()} className="side-bar-link" to="">MyPage</Link></li>}
                        <li><Link onClick = {() => sideBarSpread()} to="ootd-list" className="side-bar-link" >관음증</Link></li>
                        {isLogin ? <li><Link onClick = {() => sideBarSpread()} className="side-bar-link" to="">Diary</Link></li> : <li><Link onClick = {() => loginHandler()} className="side-bar-link" to="">Diary</Link></li>}
                        {isLogin ? <li><Link onClick = {() => sideBarSpread()} className="side-bar-link" to="record">Record</Link></li> : <li><Link onClick = {() => loginHandler()} className="side-bar-link" to="">Record</Link></li>}
                    </ul>
                </div>
            </SideBarContainer>
        </>
    );
  }
  
  export default SideBar;
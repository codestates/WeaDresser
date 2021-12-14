import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler, isShowLoginModalHandler, isShowSignUpModalHandler } from '../../redux/actions/actions'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { IconContext } from "react-icons";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";

const LikeContainer = styled.div`
    display: none;
    position: absolute;
    z-index: 100;
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(fit-content + 4em);
    >div{
        display: flex;
        justify-content: space-between;
    }
    .like-heart{
        cursor: pointer;
    }
`

const LikeCount = styled.span`
    display: inline-block;
    font-size: 1.6em;
    z-index: 100;
    color: #fff;
    margin-left: .3em;
`

function OotdLikeCont({likeCounts, likeWhether, diariesId, likeClass}){
    const [isLike, setIsLike] = useState(Boolean);
    const [likeCount, setLikeCount] = useState(Number);
    const { isLogin } = useSelector(state => state.isLoginReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        setIsLike(likeWhether)
    },[likeWhether])
    useEffect(()=>{
        setLikeCount(likeCounts)
    },[likeCounts])

    function likeThis(e, diariesId){ // 좋아요 요청
        if(!isLogin){
            dispatch(isShowLoginModalHandler(true));
            return;
        }
        setIsLike(true); 
        setLikeCount(likeCount + 1)
        axios.post('http://localhost:80/ootd/like', {diariesId, like: true}, {withCredentials: true})
        .catch(err => {
            console.log(err)
        })
        axios.put('http://localhost:80/ootd/like', {diariesId, like: true}, {withCredentials: true})
    }

    function unLikeThis(e, diariesId){ // 좋아요 요청 취소
        if(!isLogin){
            dispatch(isShowLoginModalHandler(true));
            return;
        }
        setIsLike(false); 
        setLikeCount(likeCount - 1)
        axios.post('http://localhost:80/ootd/like', {diariesId, like: false}, {withCredentials: true}) // 해당 게시물 id를 보내야 댐 내 id는 accessToken 까면 되고
        .catch(err => {
            console.log(err)
        })
        axios.put('http://localhost:80/ootd/like', {diariesId, like: false}, {withCredentials: true})
    }

    return (
        <LikeContainer className={likeClass}>
            <div>
            {!isLike ? <IconContext.Provider value={{ color: "white", size: "2em", className: "like-heart"}}><AiOutlineHeart onClick={(e) => likeThis(e, diariesId)}/></IconContext.Provider> : 
            <IconContext.Provider value={{ color: "white", size: "2em", className: "like-heart" }}><AiFillHeart onClick={(e) => unLikeThis(e, diariesId)}/></IconContext.Provider>}<LikeCount>{likeCount}</LikeCount> {/* 좋아요 수도 component로 만들것 */}
            {/* 온클릭 이벤트 useEffect로 만들어야 되겠다. 클릭하면 빨간색 돼야 되고 api로 요청 OotdListBox에서 like를 받아옴 그리고 like상태인 애는 RedHeart 그리고 클릭하면 어쨋든 빨간색도 돼야 되는데 아씨 어려워 socketIo 어때요 */}
            </div>
        </LikeContainer>
    )
}

export default OotdLikeCont;
    
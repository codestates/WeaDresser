import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler, isShowLoginModalHandler, isShowSignUpModalHandler, isShowOotdImageModalHandler } from '../../redux/actions/actions'
import axios from 'axios'; // 필요 없을거 같긴 한데 로그아웃에서 쓸 수도
import {
    OotdListBoxContainer,
    OotdListBoxImage,
    OotdListBoxBack,
    OotdListBoxOver,
    OotdListBoxItem,
} from "./OotdListBoxStyle"
import OotdImageModal from "../OotdList/OotdImageModal"
import OotdLikeCont from "./OotdLikeCont"

import { useEffect, useRef, useState } from 'react';

function OotdListBox(){
    const dispatch = useDispatch()
    const [modalImage, setModalImage] = useState('')
    const imageModalHandler = (handle) => {dispatch(isShowOotdImageModalHandler(handle))}
    const isShowImageModal = useSelector(state => state.isShowModalReducer.isShowOotdImageModal)
    let images;
    let arr = [180,800,400,400,400,650,760,670,670,890,990,511,512,813,614,515,416,617,718,319,720,821,922,523,724,725,532,527,928,729,230,340,500,600,300,405,800,300] // 나중에 지워

    const ootdListGrid = (param) => {
        images = document.querySelectorAll(".ootd-image-box");
        const colWidth = images[0].offsetWidth
        let imgStack = param
        for(let i = 0; i < images.length; i++) {
            let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
            let x = colWidth * minIndex;
            let y = imgStack[minIndex];
            imgStack[minIndex] += (images[i].children[0].scrollHeight +20);
            images[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
            if(i === images.length - 1) {
                document.querySelector(".ootd-list").style.height = `${Math.max.apply(0, imgStack)}px`;
            }
        }
    }
    useEffect(() => {// 현재 이미지를 링크로 불러오는데 아무래도 속도가 느려 images 변수값의 offestWidth 가 undefind 가 뜰때가 있는데 그걸 방지하기 위해 넣어놨다.
        if(window.matchMedia("(max-width: 400px)").matches){
            ootdListGrid([0,0])
        }else if(window.matchMedia("(max-width: 800px)").matches){
            ootdListGrid([0,0,0])
        }else if(window.matchMedia("(max-width: 1200px)").matches){
            ootdListGrid([0,0,0,0])
        }else{
            ootdListGrid([0,0,0,0,0])
        }
        window.onload = () => {
            if(window.matchMedia("(max-width: 400px)").matches){
                ootdListGrid([0,0])
            }else if(window.matchMedia("(max-width: 800px)").matches){
                ootdListGrid([0,0,0])
            }else if(window.matchMedia("(max-width: 1200px)").matches){
                ootdListGrid([0,0,0,0])
            }else{
                ootdListGrid([0,0,0,0,0])
            }
        }
        if(!images.length === 0){ // ootd 리스트에서 다른 컴포넌트에서 나간 상태로 resize가 될 경우에도 실행 되는것을 방지하기 위해 if문으로 나눔
            window.addEventListener('resize', function(){
                if(window.matchMedia("(max-width: 400px)").matches){
                    ootdListGrid([0,0])
                }else if(window.matchMedia("(max-width: 800px)").matches){
                    ootdListGrid([0,0,0])
                }else if(window.matchMedia("(max-width: 1200px)").matches){
                    ootdListGrid([0,0,0,0])
                }else{
                    ootdListGrid([0,0,0,0,0])
                }
            })
        }

    }, [images])
    

    useEffect(() => { // state값이 한 박자 늦게 찍히는거 관리
        if(modalImage){
            imageModalHandler(true)
        }else{
            imageModalHandler(false)
        }
    }, [modalImage])

    // useEffect(() => { // 현재 이미지를 링크로 불러오는데 아무래도 속도가 느려 clickedImage라는 변수값이 undefind 가 뜰때가 있는데 그걸 방지하기 위해 넣어놨다.
    //     const clickedImage = document.querySelectorAll('.ootd-image-box');
    //     for(let i = 0; i < arr.length; i++){
    //         clickedImage[i].addEventListener('click', function(){
    //             setModalImage(clickedImage[i].children[0].children[0].src)
    //         })
    //     }
    // }, [])

    const clickedImage = (e) => {
        if(!e.target.previousSibling || !e.target.previousSibling.src){
            return false;
        }
        setModalImage(e.target.previousSibling.src)
    }

    return (
        <OotdListBoxContainer className="ootd-list">
            {
                arr.map((val, idx) => {
                    return <OotdListBoxBack className="ootd-image-box" key={idx} onClick={(e) => clickedImage(e)}>
                        <OotdListBoxOver>
                            <OotdListBoxImage src={`https://picsum.photos/600/${val}/?random`} key={idx} className="ootdImage" />
                            <OotdListBoxItem><OotdLikeCont /></OotdListBoxItem>
                        </OotdListBoxOver>
                    </OotdListBoxBack>
                })
            }
            {isShowImageModal ? <OotdImageModal modalImage={modalImage} setModalImage={setModalImage} /> : null}
        </OotdListBoxContainer>
    )
}

export default OotdListBox
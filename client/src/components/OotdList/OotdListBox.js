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
    DiaryUserName,
    OotdHashtags,
    OotdHashtag,
} from "./OotdListBoxStyle"
import OotdImageModal from "../OotdList/OotdImageModal"
import OotdLikeCont from "./OotdLikeCont"

import { useCallback, useEffect, useRef, useState } from 'react';
import imagesLoaded from 'imagesloaded'
import { useOnLoadImages } from "../../isImagesOnload";
import LoadingIndicator from "../Loading/LoadingIndicator";


function OotdListBox(){

    const ootdImageBox = useRef(null);
    const ootdListContainer = useRef(null);

    const dispatch = useDispatch()
    const [modalImage, setModalImage] = useState('');
    const [listOffset, setListOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const imageModalHandler = (handle) => {dispatch(isShowOotdImageModalHandler(handle))};
    const isShowImageModal = useSelector(state => state.isShowModalReducer.isShowOotdImageModal);
    const curTemp = useSelector(state => state.getWeatherDataReducer.main);
    const [ootdListArray, setOotdListArray] = useState([]);
    const [isMoreData, setIsMoreData] = useState(true)
    let listLimit = 5;

    const ootdListGrid = useCallback((column, width) => {
            let images = document.querySelectorAll(".ootd-image-box");
            const colWidth = width
            let imgStack = column
            for(let i = 0; i < images.length; i++) {
                let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
                let x = colWidth * minIndex;
                let y = imgStack[minIndex];
                imgStack[minIndex] += (images[i].children[0].scrollHeight +20);
                images[i].style.left = "0";
                images[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
                if(i === images.length - 1 && ootdListContainer.current) {
                    ootdListContainer.current.style.height = `${Math.max.apply(0, imgStack)}px`;
                }
            }
        
    }, [])

    const getOotdList = () => { // 이건 날씨를 고려한 ootdlist 검색 X
        let tempMax = (parseInt((curTemp.temp_max - 273.15) * 10)) / 10
        let tempMin = (parseInt((curTemp.temp_min - 273.15) * 10)) / 10
        console.log(tempMax)
        console.log(tempMin)
        
        axios.get(
            `http://localhost:80/ootd?tempMax=${tempMax}&tempMin=${tempMin}&offset=${listOffset}&limit=${listLimit}`,
            { withCredentials: true }
            )
            .then(result => {
                let curOffset = listOffset
                setListOffset(curOffset + listLimit)
                if(result.data[0].length === 0){
                    console.log("더이상 받을 데이터가 없습니다.")
                    return setIsMoreData(false)
                }else{
                    setIsMoreData(true) // 로직이 이게 맞나
                }
                setOotdListArray(ootdListArray => [...ootdListArray, ...result.data[0]])
            }).then(() => {
                
            })
            .catch(err =>{
                console.log('ootd list get request is fail')
            })
    }

    const infiniteScroll = () => { // 검색어 고려 x
        const { documentElement, body } = document;
        const scrollHeight = Math.max(documentElement.scrollHeight,body.scrollHeight);
        const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
        const clientHeight = documentElement.clientHeight;
      
        if (scrollTop + clientHeight >= scrollHeight) {
          getOotdList()
        }
      };

    useEffect(() => {
        if(isMoreData){
            window.addEventListener('scroll', infiniteScroll)
        }
        return () => { // clean up
            window.removeEventListener('scroll', infiniteScroll)
        }
    })

    const resizePage = () => {
        if(window.location.pathname === "/ootd-list"){
            if(window.matchMedia("(max-width: 400px)").matches){
                ootdListGrid([0], 0)
            }else if(window.matchMedia("(max-width: 500px)").matches){
                ootdListGrid([0,0], 190)
            }else if(window.matchMedia("(max-width: 600px)").matches){
                ootdListGrid([0,0], 240)
            }else if(window.matchMedia("(max-width: 700px)").matches){
                ootdListGrid([0,0], 290)
            }else if(window.matchMedia("(max-width: 800px)").matches){
                ootdListGrid([0,0], 340)
            }else if(window.matchMedia("(max-width: 900px)").matches){
                ootdListGrid([0,0,0], 260)
            }else if(window.matchMedia("(max-width: 1000px)").matches){
                ootdListGrid([0,0,0], 293)
            }else if(window.matchMedia("(max-width: 1100px)").matches){
                ootdListGrid([0,0,0], 326)
            }else if(window.matchMedia("(max-width: 1200px)").matches){
                ootdListGrid([0,0,0], 359)
            }else if(window.matchMedia("(max-width: 1300px)").matches){
                ootdListGrid([0,0,0,0], 290)
            }else if(window.matchMedia("(max-width: 1400px)").matches){
                ootdListGrid([0,0,0,0], 315)
            }else if(window.matchMedia("(max-width: 1500px)").matches){
                ootdListGrid([0,0,0,0], 340)
            }else if(window.matchMedia("(max-width: 1600px)").matches){
                ootdListGrid([0,0,0,0], 365)
            }else if(window.matchMedia("(max-width: 1700px)").matches){
                ootdListGrid([0,0,0,0], 390)
            }else if(window.matchMedia("(max-width: 1800px)").matches){
                ootdListGrid([0,0,0,0,0], 335)
            }else{
                ootdListGrid([0,0,0,0,0], 360)
            }
        }
    }
    
    useEffect(() => {
        // console.log(imagesLoaded(ootdImageBox))
        imagesLoaded(ootdListContainer.current, function(){
            setIsLoading(true);
            resizePage();
            window.addEventListener('resize', resizePage)
            return () => { // clean up
                window.removeEventListener('resize', resizePage)
            }
        })
        return () => {
            setIsLoading(false);
        }
    },[ootdListArray])

    const isImagesLoaded = useOnLoadImages(ootdListContainer)

    useEffect(() => {
        console.log(isImagesLoaded);
    }, [ootdListArray]) // 지워

    useEffect(() => {
        getOotdList();
    }, [])

    useEffect(() => { // state값이 한 박자 늦게 찍히는거 관리
        if(modalImage){
            imageModalHandler(true)
        }else{
            imageModalHandler(false)
        }
    }, [modalImage])

    const clickedImage = (e) => {
        if(!e.target.previousSibling || !e.target.previousSibling.src){
            return false;
        }
        setModalImage(e.target.previousSibling.src)
    }

    return (
        <OotdListBoxContainer ref={ootdListContainer} className="ootd-list">
            {
                ootdListArray.map((val, idx) => {
                    return <OotdListBoxBack ref={ootdImageBox} className="ootd-image-box" key={idx} onClick={(e) => clickedImage(e)} >
                        <OotdListBoxOver>
                        <OotdListBoxImage  src={`${val.diariesImage}`} className="ootdImage" />
                        <OotdListBoxItem className="ootd-list-box-item"></OotdListBoxItem>
                        <OotdLikeCont likeCounts={val.likeCounts} likeWhether={val.likeWhether ? val.likeWhether : false} diariesId={val.diariesId} likeClass={"like-container"}/>
                        <DiaryUserName className="diary-user-name">{val.userName}</DiaryUserName> {/* 작성자 이름 */}
                        </OotdListBoxOver>
                        <OotdHashtags className="ootd-hashtags">
                        {val.hashtag ? val.hashtag.split(',').map((val, idx) => {
                                return <OotdHashtag key={idx}>
                                    #{val}
                                    </OotdHashtag>
                                
                            }) : null}
                        </OotdHashtags>
                    </OotdListBoxBack>
                })
            }
            {!isLoading ? <LoadingIndicator/> : null}
            {isShowImageModal ? <OotdImageModal modalImage={modalImage} setModalImage={setModalImage} /> : null}
        </OotdListBoxContainer>
    )
}

export default OotdListBox
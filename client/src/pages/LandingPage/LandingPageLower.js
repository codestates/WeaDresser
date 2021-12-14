import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import {
    LowerPageContainer,
    LowerPageBox,
    UserWore,
    UserWoreImage,
    UserWoreText,
    BestDresser,
    BestDresserImage,
    BestDresserText,
    OotdListBtn,
} from "./LandingPageLowerStyle"
import OotdLikeCont from "../../components/OotdList/OotdLikeCont";
import {OotdListBoxItem} from  "../../components/OotdList/OotdListBoxStyle"
import { IconContext } from "react-icons";
import {AiOutlineArrowRight} from "react-icons/ai";

function LandingPageLower(){
    const [woreImage, setWereImage] = useState('');
    const [bestImage, setBestImage] = useState('');
    const [userName, setUserName] = useState('');
    const [createAt, setCreateAt] = useState('');
    const [likeWhetherLeft, setLikeWhetherLeft] = useState('');
    const [likeCountsLeft, setLikeCountsLeft] = useState('');
    const [diariesIdLeft, setDiariesIdLeft] = useState('');
    const [likeWhetherRight, setLikeWhetherRight] = useState('');
    const [likeCountsRight, setLikeCountsRight] = useState('');
    const [diariesIdRight, setDiariesIdRight] = useState('');
    const curTemp = useSelector(state => state.getWeatherDataReducer.main);
    const { isLogin } = useSelector(state => state.isLoginReducer);

    function userWoreImageRequest(){
        let tempMax = (parseInt((curTemp.temp_max - 273.15) * 10)) / 10
        let tempMin = (parseInt((curTemp.temp_min - 273.15) * 10)) / 10
        let url = isLogin ? 'http://localhost:80/user' : 'http://localhost:80'
        axios.get(`${url}?tempMax=${tempMax}&tempMin=${tempMin}`, {withCredentials: true})
        .then( res => {
            console.log(res.data);
            setWereImage(res.data[0].diariesImage);
            setBestImage(res.data[1].diariesImage)
            setUserName(res.data[0].userName)
            setCreateAt(`${res.data[0].createdAt.split('T')[0].split('-')[0]}년 ${res.data[0].createdAt.split('T')[0].split('-')[1]} 월 ${res.data[0].createdAt.split('T')[0].split('-')[2]}일`)
            setLikeWhetherLeft(res.data[0].likeWhether);
            setLikeCountsLeft(res.data[0].likeCounts);
            setDiariesIdLeft(res.data[0].diariesId);
            setLikeWhetherRight(res.data[1].likeWhether);
            setLikeCountsRight(res.data[1].likeCounts);
            setDiariesIdRight(res.data[1].diariesId);
        }).catch( err => {
            console.log(err)
        })
    }


    useEffect(() => {
        if(curTemp){
            userWoreImageRequest();
        }
    }, [curTemp, isLogin])

    return(
        <LowerPageContainer>
            <LowerPageBox>
                <UserWore>
                    <UserWoreImage woreUrl={woreImage}>
                        <OotdListBoxItem className="ootd-list-box-item"></OotdListBoxItem>
                    </UserWoreImage>
                    <UserWoreText>이런 날씨에 {createAt} {userName}님은<br />이렇게 입으셨어요</UserWoreText>
                    <OotdLikeCont likeCounts={likeCountsLeft} likeWhether={likeWhetherLeft ? likeWhetherLeft : false} diariesId={diariesIdLeft} likeClass={"user-wore-like"}/>
                </UserWore>
                <BestDresser>
                    <BestDresserImage bestUrl={bestImage}>
                        <OotdListBoxItem className="ootd-list-box-item"></OotdListBoxItem>
                    </BestDresserImage>
                    <BestDresserText>오늘 날씨 최고 좋아요 받은 코디</BestDresserText>
                    <OotdLikeCont likeCounts={likeCountsRight} likeWhether={likeWhetherRight ? likeWhetherRight : false} diariesId={diariesIdRight} likeClass={"best-ootd-like"}/>
                </BestDresser>
            </LowerPageBox>
            <OotdListBtn to="/ootd-list">다른 사람들 옷이 궁금해?<IconContext.Provider value={{ size: "1.3em", className: "ootdlist-btn-arr"}}><AiOutlineArrowRight /></IconContext.Provider></OotdListBtn>
        </LowerPageContainer>

    )
}

export default LandingPageLower;
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
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
    NoDataImage
} from "./LandingPageLowerStyle"
import OotdLikeCont from "../../components/OotdList/OotdLikeCont";
import {OotdListBoxItem} from  "../../components/OotdList/OotdListBoxStyle"
import { IconContext } from "react-icons";
import {AiOutlineArrowRight} from "react-icons/ai";
import { navTop } from '../../redux/actions/actions';

function LandingPageLower(){
    const dispatch = useDispatch();
    const lowerTop = useRef(null);
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
    const [isData, setIsData] = useState(true);
    const curTemp = useSelector(state => state.getWeatherDataReducer.main);
    const { isLogin } = useSelector(state => state.isLoginReducer);

    function userWoreImageRequest(){
        let tempMax = Math.round(curTemp.temp_max * 10 / 10).toFixed(1);
        let tempMin = Math.round(curTemp.temp_min * 10 / 10).toFixed(1);
        let url = isLogin ? `${process.env.REACT_APP_SERVER_URL}/user` : `${process.env.REACT_APP_SERVER_URL}`
        axios.get(`${url}?tempMax=${tempMax}&tempMin=${tempMin}`, {withCredentials: true})
        .then( res => {
            setIsData(true);
            setWereImage(res.data[0].image);
            setBestImage(res.data[1].image)
            setUserName(res.data[0].userName)
            setCreateAt(`${res.data[0].createdAt.split('T')[0].split('-')[0]}년 ${res.data[0].createdAt.split('T')[0].split('-')[1]} 월 ${res.data[0].createdAt.split('T')[0].split('-')[2]}일`)
            setLikeWhetherLeft(res.data[0].likeWhether);
            setLikeCountsLeft(res.data[0].likeCounts);
            setDiariesIdLeft(res.data[0].id);
            setLikeWhetherRight(res.data[1].likeWhether);
            setLikeCountsRight(res.data[1].likeCounts);
            setDiariesIdRight(res.data[1].id);
        }).catch( err => {
            setIsData(false);
        })
    }

    useEffect(() => {
        dispatch(navTop(lowerTop.current.offsetTop));
    }, [])

    useEffect(() => {
        if(curTemp){
            userWoreImageRequest();
        }
    }, [curTemp, isLogin])

    return(
        <LowerPageContainer ref={lowerTop}>
            <LowerPageBox>
                <UserWore>
                {isData ? 
                <>
                    <UserWoreImage woreUrl={woreImage}>
                        <OotdListBoxItem className="ootd-list-box-item"></OotdListBoxItem>
                    </UserWoreImage>
                    <UserWoreText>이런 날씨에 {createAt} {userName}님은<br />이렇게 입으셨어요</UserWoreText>
                    <OotdLikeCont likeCounts={likeCountsLeft} likeWhether={likeWhetherLeft ? likeWhetherLeft : false} diariesId={diariesIdLeft} likeClass={"user-wore-like"}/>
                </>
                    : <NoDataImage>현재 추천할 옷이 없어요 지금 찍어 올리시는건 어떨까요??</NoDataImage>
                }
                </UserWore>
                <BestDresser>
                {isData ?
                <>
                    <BestDresserImage bestUrl={bestImage}>
                        <OotdListBoxItem className="ootd-list-box-item"></OotdListBoxItem>
                    </BestDresserImage>
                    <BestDresserText>오늘 날씨 최고 좋아요 받은 코디</BestDresserText>
                    <OotdLikeCont likeCounts={likeCountsRight} likeWhether={likeWhetherRight ? likeWhetherRight : false} diariesId={diariesIdRight} likeClass={"best-ootd-like"}/>
                </>
                    : <NoDataImage>현재 추천할 옷이 없어요 지금 찍어 올리시는건 어떨까요??</NoDataImage>
                }
                </BestDresser>
            </LowerPageBox>
            <OotdListBtn to="/ootd-list">다른 사람들 옷이 궁금해?<IconContext.Provider value={{ size: "1.3em", className: "ootdlist-btn-arr"}}><AiOutlineArrowRight /></IconContext.Provider></OotdListBtn>
        </LowerPageContainer>

    )
}

export default LandingPageLower;
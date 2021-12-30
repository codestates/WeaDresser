import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { TabBody,
    DateDataBar,
    WeatherIcon,
    RecordContainer,
    ImageBox,
    ContentBox,
    HashtagBox,
    DotMenuBox,
    DotMenu,
    SlideContainer,
    Button as PrecButton,
    Button2 as NextButton,
    OutBox,
    InnerBox,
    DotMenuButton1,
    DotMenuButton2,
    // EmptyContainer,
    // EmptyIcon,
    // EmptyMesaage,
} from './DiaryPageStyle';
import DeleteDiaryModal from '../../components/Modal/DeleteDiaryModal';
import { recordDataHandler } from '../../redux/actions/actions';
import EditRecord from '../../components/EditRecord/EditRecord';
import DatePicker from '../../components/DatePicker/DatePicker';
import sun from '../../images/sun.png';
import cloud from '../../images/cloud.png';
// import moon from '../../images/moon.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
// import LoadingIndicator from './components/Loading/LoadingIndicator'



function DiaryPage() {

    const dispatch = useDispatch();
    const [fetchedDiary, setFetchedDiary] = useState([]);
    const [weatherIcon, setWeatherIcon] = useState(null); 
    const [weatherDesc, setWeatherDesc] = useState('');
    const [curSlide, setCurSlide] = useState(0);
    const [isDotMenu, setIsDotMenu] = useState(false);
    const [isLeftEndPage, setIsLeftEndPage] = useState(false);
    const [isRightEndPage, setIsRightEndPage] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [curDate, setCurDate] = useState(new Date());
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const imgSlideRef = useRef(null);
    // const selectedRecordData = useSelector(state => state.getRecordDataReducer);
    // console.log(selectedRecordData.getRecordData);


    useEffect(() => { // 더미 데이터 확인용
        dispatch(recordDataHandler(fetchedDiary));
    }, []);
    
    useEffect(() => {
        
        function fetchFn () {
            
            // const url = process.env.REACT_APP_SERVER_URL || 
            const today = `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()}`;
            const url = `${process.env.REACT_APP_SERVER_URL}/mypage/diary?date=${today}`;
            axios.get(url, { withCredentials: true})
                .then(data => {
                    setFetchedDiary(data.data); // dispatch로 전달해주자
                    dispatch(recordDataHandler(data)); // EditRecord로 상태 전달하기 위함
                    if (data.data[0].weather === 'Clouds' || data.data[0].weather === 'Fog' || data.data[0].weather === 'Mist') {
                        setWeatherIcon(cloud);
                        setWeatherDesc('흐림');
                    }
                    if (data.data[0].weather === 'Snow') {
                        setWeatherIcon(snow);
                        setWeatherDesc('눈');
                    }
                    if (data.data[0].weather === 'Rain' || data.data[0].weather === 'Thunderstrom') {
                        setWeatherIcon(rain);
                        setWeatherDesc('비');
                    } 
                    if (data.data[0].weather === 'Clear') {
                        setWeatherIcon(sun);
                        setWeatherDesc('맑음');
                    }
                })
                .catch(err => console.log(err));;
            
        }
        fetchFn ();
        
    }, [curDate]);

    const TOTAL_SLIDES = fetchedDiary.length - 1;
    function nextButton () {
        if (curSlide >= TOTAL_SLIDES) {
            return;
        } else {
            setCurSlide(curSlide + 1);
        }
    }
    function prevButton () {
        if (curSlide === 0) {
            return;
        } else {
            setCurSlide(curSlide - 1);
        }
    }

    useEffect(() => {
        imgSlideRef.current.style.transition = "all 0.5s ease-in-out";
        imgSlideRef.current.style.transform = `translateX(-${curSlide}00%)`; 
    }, [curSlide]);

    
    function showDotMenu (e) { // 외부 클릭해도 닫기 기능 구현?
        e.preventDefault();
        setIsDotMenu(!isDotMenu);
    }
    
    function editRecordButton (e) {
        e.preventDefault();
        setIsEdit(!isEdit);
        setIsDotMenu(false);
        setIsLeftEndPage(true);
        setIsRightEndPage(true);
    }
    
    useEffect(() => {
        if (curSlide === 0) {
            setIsLeftEndPage(true);
        } else {
            setIsLeftEndPage(false);
        }

        if (curSlide === TOTAL_SLIDES) {
            setIsRightEndPage(true);
        } else {
            setIsRightEndPage(false);
        }

    }, [curSlide, isLeftEndPage, isRightEndPage, fetchedDiary]);

    function deleteRecordButton (e) {
        let copiedFetchedData = fetchedDiary.slice();
        copiedFetchedData.splice(curSlide, 1);
        setFetchedDiary([...copiedFetchedData]);
        if (curSlide > 0 && curSlide === TOTAL_SLIDES) {
            setCurSlide(curSlide - 1);
        }
        if (fetchedDiary.length === 0 || curSlide === 0 || fetchedDiary[0] === undefined) {
            setIsLeftEndPage(true);
            setIsRightEndPage(true);
        }
        if (curSlide > 0 && curSlide === TOTAL_SLIDES - 1) {
            setIsRightEndPage(true);
        }

        setShowDeleteModal(false);
        let diaryId = fetchedDiary[curSlide].id
        let url = `${process.env.REACT_APP_SERVER_URL}/mypage/diary?diaryId=${diaryId}` // 날씨데이터도 넘겨줘야 하는가?
        axios.delete(url, { withCredentials: true })
            .then(res => {console.log('delete successfully');})
            .catch(err => {console.log(err);})
    }

    return (
        <TabBody>
            <DateDataBar>
                <div>
                    <DatePicker curDate={curDate} setCurDate={setCurDate} />
                </div>
                <div>
                    <WeatherIcon icon={weatherIcon}></WeatherIcon>
                    <span className="weather-desc">{weatherDesc}</span>
                </div>
                <div>
                    <span className="temp-desc">최고기온</span>
                    {fetchedDiary.length !== 0 ? <span className="temp-max">{fetchedDiary[0].tempMax }°C</span> : null}
                </div>
                <div>
                    <span className="temp-desc">최저기온</span>
                    {fetchedDiary.length !== 0 ? <span className="temp-min">{fetchedDiary[0].tempMin}°C</span> : null}
                </div>
            </DateDataBar>
                <RecordContainer isEdit={isEdit}>
                    {
                        isEdit ? <EditRecord formId={"record"} curSlide={curSlide} setIsEdit={setIsEdit} setCurSlide={setCurSlide} fetchedDiary={fetchedDiary} />
                        :
                        <SlideContainer >
                            <OutBox ref={imgSlideRef}>
                        { fetchedDiary.length !== 0 ? 
                            fetchedDiary.map((el) => 
                                <InnerBox key={el.id}>
                                    <ImageBox img={el.image} ></ImageBox>
                                    <ContentBox>{el.content}</ContentBox>
                                    <HashtagBox>{el.hashtag.map((tag) => 
                                        <span key={tag}>{`#${tag}`}</span>)}
                                    </HashtagBox>
                                </InnerBox>
                            )
                        : null }
                            </OutBox>
                        </SlideContainer>
                    }
                    { isLeftEndPage || isEdit ? null : <PrecButton onClick={prevButton}></PrecButton> }
                    { isRightEndPage || isEdit ? null : <NextButton onClick={nextButton}></NextButton> }
                    { fetchedDiary[0] !== undefined ?
                        <DotMenuBox isEdit={isEdit} onClick={(e) => showDotMenu(e)}>
                            <DotMenu isDotMenu={isDotMenu}>
                                <DotMenuButton1 type="button" onClick={(e) => editRecordButton(e)}>수정</DotMenuButton1>
                                <DotMenuButton2 onClick={(e) => setShowDeleteModal(e)}>삭제</DotMenuButton2>
                            </DotMenu>
                        </DotMenuBox>
                        : 
                        null
                        // <EmptyContainer>
                        //     <EmptyIcon></EmptyIcon>
                        //     <EmptyMesaage>작성한 글이 없습니다.<br/>글을 작성하시려면 위 아이콘을 클릭 하세요.</EmptyMesaage>
                        // </EmptyContainer>
                    }
                </RecordContainer>
            {showDeleteModal ? <DeleteDiaryModal deleteRecordButton={deleteRecordButton} setShowDeleteModal={setShowDeleteModal} /> : null}
        </TabBody>
    )
}

export default DiaryPage

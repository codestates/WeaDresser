import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Container,
  PageHeader,
  UserIcon,
  MyPageTabBox,
  TabBody,
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
  BOX,
  DotMenuButton1,
  DotMenuButton2,
  DotMenuButton3,
} from "./DiaryPageStyle";
import { recordDataHandler } from "../../redux/actions/actions";
import EditRecord from "../../components/EditRecord/EditRecord";
import DatePicker from "../../components/DatePicker/DatePicker";
import sun from "../../images/sun.png";
import cloud from "../../images/cloud.png";
import moon from "../../images/moon.png";
import rain from "../../images/rain.png";
import snow from "../../images/snow.png";
import 뽀시 from "../../images-dummy(추후삭제)/뽀시.jpeg";
import 군침이 from "../../images-dummy(추후삭제)/군침이.jpeg";
import 군침이2 from "../../images-dummy(추후삭제)/군침이2.jpeg";
import { useForm } from "react-hook-form";

function DiaryPage() {
  const dispatch = useDispatch();
  const [fetchedDiary, setFetchedDiary] = useState({
    // axios.get 해온 데이터가 들어갈 useState
    record: [
      {
        id: 1,
        image: 뽀시,
        content: "군침이 싹도노",
        hashtag: "hello, world",
      },
      {
        id: 2,
        image: 군침이,
        content: "아~ 피곤하다",
        hashtag: "good, job",
      },
      {
        id: 3,
        image: 군침이2,
        content: "오늘날씨 비옴",
        hashtag: "깡",
      },
    ],
  });
  const [weatherIcon, setWeatherIcon] = useState(moon);
  const [weatherDesc, setWeatherDesc] = useState("맑음");
  const [curSlide, setCurSlide] = useState(0);
  const [isDotMenu, setIsDotMenu] = useState(false);
  const [isLeftEndPage, setIsLeftEndPage] = useState(false);
  const [isRightEndPage, setIsRightEndPage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [curDate, setCurDate] = useState(new Date());
  const imgSlideRef = useRef(null);
  // const selectedRecordData = useSelector(state => state.getRecordDataReducer);
  // console.log(selectedRecordData.getRecordData);
  // const dateData = useSelector(state => state.getDateDataReducer); // props로 전달해서상태 없데이트

  useEffect(() => {
    // 더미 데이터 확인용
    dispatch(recordDataHandler(fetchedDiary));
  }, []);

  // const url = process.env.REACT_APP_SERVER_URL ||
  const url = `${process.env.REACT_APP_SERVER_URL}/mypage/record`; // develop환경때는 환경변수 x
  console.log(curDate);

  useEffect(() => {
    async function fetchFn() {
      const body = {}; // selectedData가 가야할듯 // 현재 날짜 기준을 바디로 보내서 서버에서 해당 날짜 조회된 데이터를 받아옴
      const fetchData = await axios.get(url, body, { withCredentials: true });
      // fetchData 자체를 상태로 관리 // 상태 나눠서 관리하지 말고 하나의 상태로 관리!!!

      // setFetchedDiary(fetchData); // dispatch로 전달해주자
      // dispatch(recordDataHandler(fetchData));
      if (fetchData.weatherData.weather) {
        if (fetchData.weatherData.weather[0].main === "Clouds") {
          setWeatherIcon(cloud);
          setWeatherDesc("흐림");
        }
        if (fetchData.weatherData.weather[0].main === "Snow") {
          setWeatherIcon(snow);
          setWeatherDesc("눈");
        }
        if (
          fetchData.weatherData.weather[0].main === "Rain" ||
          fetchData.weatherData.weather[0].main === "Thunderstrom"
        ) {
          setWeatherIcon(rain);
          setWeatherDesc("비");
        } else {
          setWeatherIcon(sun);
          setWeatherDesc("맑음");
        }
      }
    }
    fetchFn();
  }, []);

  const TOTAL_SLIDES = fetchedDiary.record.length - 1;
  function nextButton() {
    if (curSlide >= TOTAL_SLIDES) {
      return;
    } else {
      setCurSlide(curSlide + 1);
    }
  }
  function prevButton() {
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

  function showDotMenu(e) {
    // 외부 클릭해도 닫기 기능 구현?
    e.preventDefault();
    setIsDotMenu(!isDotMenu);
  }

  function editRecordButton(e) {
    setIsEdit(!isEdit);
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

  function deleteRecordButton(e) {
    let copiedFetchedData = fetchedDiary.record.slice();
    copiedFetchedData.splice(curSlide, 1);
    fetchedDiary.record = [...copiedFetchedData];
    setFetchedDiary(fetchedDiary);
    if (curSlide > 0 && curSlide === TOTAL_SLIDES) {
      setCurSlide(curSlide - 1);
    }
    if (fetchedDiary.record.length === 0 || curSlide === 0) {
      setIsLeftEndPage(true);
      setIsRightEndPage(true);
    }
    if (curSlide > 0 && curSlide === TOTAL_SLIDES - 1) {
      setIsRightEndPage(true);
    }

    // let body = fetchedDiary // 날씨데이터도 넘겨줘야 하는가?
    // axios.delete(url , body, {
    //     withCredentials: true,
    // })
    //     .then(res => {
    //         console.log('delete successfully');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
  }

  return (
    <Container>
      <PageHeader>
        <UserIcon></UserIcon>
        <h1>MY PAGE</h1>
      </PageHeader>
      <MyPageTabBox>
        <div className="diary-tab">유저 다이어리</div>
        <div className="userinfo-tab">개인 정보 수정</div>
      </MyPageTabBox>
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
            <span className="temp-max">12°C</span>
          </div>
          <div>
            <span className="temp-desc">최저기온</span>
            <span className="temp-min">12°C</span>
          </div>
        </DateDataBar>
        <RecordContainer isEdit={isEdit}>
          {isEdit ? (
            <EditRecord formId={"record"} curSlide={curSlide} />
          ) : (
            <SlideContainer ref={imgSlideRef}>
              {fetchedDiary.record.map((el) => (
                <BOX key={el.id}>
                  <ImageBox img={el.image}></ImageBox>
                  <ContentBox>{el.content}</ContentBox>
                  <HashtagBox>
                    {el.hashtag.split(", ").map((tag) => (
                      <span key={tag}>{`#${tag}`}</span>
                    ))}
                  </HashtagBox>
                </BOX>
              ))}
            </SlideContainer>
          )}
          {isLeftEndPage || isEdit ? null : (
            <PrecButton onClick={prevButton}>prev</PrecButton>
          )}
          {isRightEndPage || isEdit ? null : (
            <NextButton onClick={nextButton}>next</NextButton>
          )}
        </RecordContainer>
        {isEdit ? (
          <DotMenuBox onClick={(e) => showDotMenu(e)}>
            <DotMenu isDotMenu={true}>
              <DotMenuButton3>완료</DotMenuButton3>
              <DotMenuButton2 onClick={(e) => editRecordButton(e)}>
                취소
              </DotMenuButton2>
            </DotMenu>
          </DotMenuBox>
        ) : (
          <DotMenuBox onClick={(e) => showDotMenu(e)}>
            <DotMenu isDotMenu={isDotMenu}>
              <DotMenuButton1
                isDotMenu={isDotMenu}
                onClick={(e) => editRecordButton(e)}
              >
                수정
              </DotMenuButton1>
              <DotMenuButton2
                isDotMenu={isDotMenu}
                onClick={(e) => deleteRecordButton(e)}
              >
                삭제
              </DotMenuButton2>
            </DotMenu>
          </DotMenuBox>
        )}
      </TabBody>
    </Container>
  );
}

export default DiaryPage;

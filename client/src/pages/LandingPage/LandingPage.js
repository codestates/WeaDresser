import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getWeatherData } from '../../redux/actions/actions';
import {
    Container, 
    LandingPageContainer, 
    MainLogo, WeatherIconBox, 
    WeahterBarBox, 
    Scroll,
    WeatherIcon
} from './LandingPageStyle';
import axios from 'axios';
import sun from '../../images/sun.png';
import cloud from '../../images/cloud.png';
// import moon from '../../images/moon.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import LandingPageLower from './LandingPageLower'

function LandingPage () {

    const [curWeather, setCurWeather] = useState('');
    const [curIcon, setCurIcon] = useState(null);
    const scrollRef = useRef(null);
    // const [dayNight, setDayNight] = useState('day');
    const dispatch = useDispatch();
    const weatherData = useSelector(state => state.getWeatherDataReducer); // redux-thunk 다시 보기
    const {navTopLoc} = useSelector(state => state.navTopReducer);
    function askForCoords() {
        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };
        navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError, options);
    }

    function handleGeoSucces (location) {
        const lat = location.coords.latitude;
        const lot = location.coords.longitude;
        // dispatch(getLocationData(lat, lot));

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lot}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(result => {
                const { coord, main, name, sys, weather } = result.data;
                dispatch(getWeatherData({ coord, main, name, sys, weather }));
            })
            .catch(err => console.log('err', err));
    }
    
    function handleGeoError (err) {
        console.log('Cannot get your location', err);
    }

    useEffect (() => {
        let complete = false;

        if (!complete) {
            askForCoords();
            complete = true;
        }

    }, []);

    useEffect(() => {
        // console.log('날씨!@#',weatherData);
        if (weatherData.weather) {
            //  console.log(weatherData.weather[0])
             if (weatherData.weather[0].main === 'Clear') {
                 setCurWeather('맑음');
                 setCurIcon(sun);
             }
             if (weatherData.weather[0].main === 'Clouds' || weatherData.weather[0].main === 'Fog' || weatherData.weather[0].main === 'Mist') {
                setCurWeather('흐림');
                setCurIcon(cloud);
            }
            if (weatherData.weather[0].main === 'Snow') {
                setCurWeather('눈');
                setCurIcon(snow);
            }
            if (weatherData.weather[0].main === 'Rain' || weatherData.weather[0].main === 'Thunderstrom' || weatherData.weather[0].main === 'Drizzle') {
                setCurWeather('비');
                setCurIcon(rain);
            }
        }
        
    }, [weatherData, curWeather, curIcon]);

    function MoveToDown () {
        // console.log(scrollRef.current.offsetTop,'rfrfrfrfrfrfrf')
        // scrollRef.current.style.tranform = "translateY(100%)"
        window.scroll({top: navTopLoc, behavior:'smooth'})
    }
    return (
        <>
            <Container ref={scrollRef}>
                 <LandingPageContainer>
                    <MainLogo></MainLogo>
                    <WeatherIconBox>
                        <li className="icon1"></li>
                        <li className="icon2"></li>
                        <li className="icon3"></li>
                        <li className="icon4"></li>
                        <li className="icon5"></li>
                    </WeatherIconBox>
                    <WeahterBarBox>
                    {
                    !weatherData.main ? 
                        <LoadingIndicator /> // 로딩페이지로 바꿔서 넣어야 할 듯?
                    :
                        <>
                            <div className='weather-area'>
                                <WeatherIcon imgUrl={curIcon}></WeatherIcon>
                                <span className="temp-now">{Math.round(weatherData.main.temp * 10 / 10).toFixed(1)}°C</span>
                                <span className="desc">{curWeather}</span>
                            </div>
                            <div className='weather-area'>
                                <span className="temp1">최고기온</span>
                                <span className="temp2">{Math.round(weatherData.main.temp_max * 10 / 10).toFixed(1)}°C</span>
                            </div>
                            <div className='weather-area'>
                                <span className="temp1">최저기온</span>
                                <span className="temp3">{Math.round(weatherData.main.temp_min * 10 / 10).toFixed(1)}°C</span>
                            </div>
                        </>
                    }
                    </WeahterBarBox>
                    <Scroll onClick={MoveToDown} />
                </LandingPageContainer>
            </Container>
            <LandingPageLower />
        </>
    )
}

export default LandingPage;
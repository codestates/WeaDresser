/* 랜딩페이지 첫 화면 */
import styled from 'styled-components';
import title from '../../images/title.svg'
import sun from '../../images/sun.png';
import cloud from '../../images/cloud.png';
import moon from '../../images/moon.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
import scroll from '../../images/scroll_ic.svg'

export const Container = styled.div`
  width: 100%; 
  height: 100vh; 
`
export const LandingPageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    background: linear-gradient(124deg, #5b81fa 13%, #0852a8 98%);

    /* @media screen and (max-width: 77em) {
      background: linear-gradient(124deg, #36178b 13%, #01041f 98%);
    } */
`;

export const MainLogo = styled.div`
    background-image: url(${title});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 68em;
    height: 7.3em;
    position: absolute;
    top: 27%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* @media screen and (max-width: 77em) {
      width: 49em;
      height: 5em;    
      } */
`

export const WeatherIconBox = styled.ul`
    position: absolute;
    width: 100em;
    height: 23em;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    
    /* @media screen and (max-width: 77em) {
      width: 70%;
      height: 40em;
      flex-wrap: wrap;
      justify-content: space-around;
    } */
    .icon1 {
      width: 22em;
      height: 22em;
      background-image: url(${sun});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .icon2 {
      width: 21em;
      height: 11em;
      background-image: url(${cloud});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .icon3 {
      width: 23em;
      height: 14em;
      background-image: url(${moon});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .icon4 {
      width: 22em;
      height: 14em;
      background-image: url(${rain});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .icon5 {
      width: 21em;
      height: 14em;
      background-image: url(${snow});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
`

export const WeahterBarBox = styled.div`
    position: absolute;
    width: 87em;
    height: 10.0em;
    top: 77%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 20px 20px 0 rgba(12, 35, 114, 0.3);
    border-radius: 50px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #25287e;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: center;
    text-align: center; */

    > div {
      width: 30%;
      height: 10em;
      display: flex;
      align-items: center;
      position: relative;
      justify-content: center;
      /* border-right: 1px solid #fff; */
      &:after {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 1px;
        height: 2em;
        background-color: #6975d3;
      }

      &:nth-child(3) {
        &:after { 
          width: 0;  
        }
      }

      > span {
        line-height: 10em;
        width: 40%;
        text-align: center;
        white-space: nowrap;

        &:nth-child(2) {
          width: 33%;
          margin-left: 10px;
        }
        /* display: block; */
      }
    }
    

    /* .icon {
      width: 7em;
      height: 3.8em;
      background-image: url(${props => props.imgUrl});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    } */
    .temp-now {
      margin: 3px 0 0 0;
      font-size: 2.8em;
      color: #fff;
    }
    .desc {
      margin: 0 30px 0 0;
      font-size: 2.6em;
      color: #fff;
    }
    .temp1 {
      margin-left: 5px;
      color: #fff;
      font-size: 2.4em;
    }
    .temp2 {
      margin: 3px 0 0 0;
      font-size: 2.8em;
      color: #ff2f77;
    }
    .temp3 {
      margin: 3px 0 0 0;
      font-size: 2.8em;
      color: #69aeff;
    }
`
export const WeatherIcon = styled.span`
width: 7em;
height: 5.5em;
background-image: url(${props => props.imgUrl});
background-repeat: no-repeat;
background-size: contain;
background-position: center;
`

export const Scroll = styled.div`
    background-image: url(${scroll});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 4.4em;
    height: 8.6em;
    position: absolute;
    top: 92%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: motion 0.4s linear 0s infinite alternate;
    /* margin-top: 0; */

    @keyframes motion {
      0% {
        margin-top: 1em;
      }
      100% {
        margin-top: 0px;
      }
    }
`
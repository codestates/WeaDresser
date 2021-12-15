import styled from "styled-components";
import usericon from '../../images/userinfo_ic.svg';
import menuicon from '../../images/menu_ic_nor.svg';
import menuiconHover from '../../images/menu_ic_press.svg';
import close from '../../images/close_ic.png';
import lefticon from '../../images/arrow-left.png';
import righticon from '../../images/arrow-right.png';

export const Container = styled.div` 
    width: 100%; 
    height: 100vh; 
    background-color: #eceaf5;
`

export const PageHeader = styled.div`
    margin: 0 auto;
    width: 100em;
    height: 10em;
    position: relative;
    top: 11%;
    display: flex;

    &:after {
        position: absolute;
        width: 100em;
        margin-top: 6em;
        content: "";
        border-bottom: 0.1em solid #717171;
    }
    
    > h1 {
        margin-left: 1rem;
        font-family: NotoSansKR;
        font-size: 3.0em;
        font-style: normal;
        letter-spacing: normal;
        color: #17191d;    
    }
`

export const UserIcon = styled.div`
    width: 6em;
    height: 6em;
    position: relative;
    margin-bottom: 20em;
    background-image: url(${usericon});
    bottom: 10%;

`

export const MyPageTabBox = styled.div`
    width: 100em;
    height: 7.9em;
    position: relative;
    top: 10%;
    margin: 0 auto;
    display: flex;
    align-items: left;

    .diary-tab {
        width: 30rem;
        height: 7.9rem;
        text-align: center;
        font-family: NotoSansKRKR;
        font-size: 2.2em;
        font-weight: 500;
        font-style: normal;
        line-height: 3.5;
        letter-spacing: normal;
        color: #2862e5;
        border: solid 1px #ddd;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;

        &:after {
            position: absolute;
            width: 30.15rem;
            height: 7.5rem;
            left: 0;
            content: "";
            border-bottom: 0.4rem solid #2862e5;
        }
    }

    .userinfo-tab {
        width: 30rem;
        height: 7.9rem;
        text-align: center;
        font-family: NotoSansKRKR;
        margin-left: 1rem;
        font-size: 2.2em;
        font-weight: 500;
        font-style: normal;
        line-height: 3.5;
        letter-spacing: normal;
        color: #767677;
        border: solid 1px #ddd;
        border-radius: 4px;
        background-color: #f4f4f8;
        cursor: pointer;

        :hover {
            background-color: #fff;
            color: #2862e5;
            &:after {
                position: absolute;
                width: 30.15rem;
                height: 7.5rem;
                left: 0;
                content: "";
                border-bottom: 0.4rem solid #2862e5;
            }
        }
    }
`

export const MyPageTab = styled.div`
    position: relative;
    border: solid 1px #ddd;
    display: flex;
    /* border-bottom: solid 1px #ddd; */
`

export const TabBody = styled.div`
    width: 100em;
    height: 66.5em;
    position: relative;
    top: 10%;
    background-color: #fff;
    border: solid 1px #ddd;
    margin: 0 auto;
`

export const DateDataBar = styled.div`
    width: 54em;
    height: 4em;
    position: relative;
    margin: 0 auto;
    top: 3em;
    display: flex;
    color: #fff;
    
    > div {
        width: auto;
        height: 100%;
        /* flex-grow: 1; */
        display: flex;

        &:after {
            right: 0;
            content: "";
            width: 0.2em;
            height: 1.8em;
            background-color: #c4c4c4;
            margin-top: 1.2em;
        }
        &:last-child:after {
            display: none;
        }

    }

    .weather-desc {
        /* margin-left: 0.5em; */
        font-size: 2em;
        font-family: NotoSansKRKR;
        line-height: 2.2;
        letter-spacing: 0.1em;
        color: #17191d;
        margin-right: 0.5em;
    }

    .temp-desc {
        font-family: NotoSansKRKR;
        font-size: 2em;
        line-height: 2.2;
        letter-spacing: normal;
        color: #17191d;
        margin: 0 0.5em 0 0.5em;
    }

    .temp-max {
        font-family: NotoSansKRKR;
        font-size: 2.4em;
        font-weight: bold;
        line-height: 1.9;
        letter-spacing: normal;
        color: #ff2f77;
        margin-right: 0.5em;
    }

    .temp-min {
        font-family: NotoSansKRKR;
        font-size: 2.4em;
        font-weight: bold;
        line-height: 1.9;
        letter-spacing: normal;
        color: #69aeff;
    }
`

export const WeatherIcon = styled.span`
    width: 3.0em;
    height: 3.0em;
    margin: 0.4em 1em 0 1em;
    background-image: url(${props => props.icon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`

export const RecordContainer = styled.div`
    width: 47.8em;
    height: 53.9em;
    margin: 0 auto;
    top: 7.5%;
    position: relative;
    background-color: #f9f9fb;
    overflow: ${props => props.isEdit ? "visible" : "hidden"};
`
export const SlideContainer = styled.div`
    width: auto;
    height: 53.9em;
    margin: 0 auto;
    display: flex;
`
export const BOX = styled.div`
    margin: 0 auto;
    height: 50.9em;
`
export const ImageBox = styled.div`
    width: 47.8rem;
    height: 32.4em;
    background: aliceblue;
    background-size: contain;
    background-image: url(${props => props.img});
    background-repeat: no-repeat;
    background-position: center;
`
export const ContentBox = styled.div`
    width: 47.0rem;
    height: 13rem;
    /* background: cornflowerblue; */
    font-family: NotoSansKR;
    font-size: 1.4em;
    line-height: 2.5;
    letter-spacing: normal;
    margin-left: 0.5em;
    background-color: #f9f9fb;
`
export const HashtagBox = styled.ul`
    width: 47.8rem;
    height: 8.5em;
    padding-top: 0.5em;
    position: relative;
    background: wheat;
    display: flex;
    flex-wrap: wrap;


    > span {
        width: auto;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        padding: 0 8px;
        font-size: 1.4rem;
        border-radius: 4px;
        margin: 0 4px 4px 0.5em;
        background-color: #5694F8;
        letter-spacing: 1px;
        :hover {
            background-color: #3471d5;
        }
    }
`
export const Button = styled.div`
    /* all: unset; */
    top: 25%;
    left: -1em; 
    padding: 1em 2em;
    margin: 2em 2em;
    border-radius: 10px;
    border: 1px solid salmon;
    z-index: 99;
    position: absolute;
    &:hover {
        background-color: salmon;
        color: #fff;
    }
`
export const Button2 = styled.div`
    /* all: unset; */
    top: 25%;
    right: -1em;
    padding: 1em 2em;
    margin: 2em 2em;
    border-radius: 10px;
    border: 1px solid salmon;
    z-index: 99;
    position: absolute;
    &:hover {
        background-color: salmon;
        color: #fff;
    }
`

export const DotMenuBox = styled.div`
    bottom: 73.5%;
    left: 75%;
    position: relative;
    padding: 0 1em 0 1em;
    width: 0.6em;
    height: 3.4em;
    background-image: url(${menuicon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    
    :hover {
        background-image: url(${menuiconHover});
    }
    `

export const DotMenu = styled.div`
    display: ${props => props.isDotMenu ? 'block' : 'none'};
    width: 9.4em;
    height: 10em;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
    border: solid 1px #d9d9d9;
    background-color: #fff;
    left: 2.5em;
`
export const DotMenuButton1 = styled.button`
    width: 100%;
    height: 5rem;
    position: relative;
    font-family: NanumBarunGothicOTF;
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    line-height: 3;
    letter-spacing: normal;
    color: #2862e5;
    border-bottom: solid 1px #d9d9d9;
    cursor: pointer;

    :hover {
        background-color: #f2f2f4;
    }
`
export const DotMenuButton2 = styled.button`
    width: 100%;
    height: 5rem;
    position: relative;
    font-family: NanumBarunGothicOTF;
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    line-height: 2.8;
    letter-spacing: normal;
    color: #ed3829;
    border-bottom: solid 1px #d9d9d9;
    cursor: pointer;

    :hover {
        background-color: #f2f2f4;
    }
`

export const DotMenuButton3 = styled.button.attrs(props => ({
    type: "submit",
    form: "record",
}))`
    width: 100%;
    height: 5rem;
    position: relative;
    font-family: NanumBarunGothicOTF;
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    line-height: 3;
    letter-spacing: normal;
    color: #2862e5;
    border-bottom: solid 1px #d9d9d9;
    cursor: pointer;

    :hover {
        background-color: #f2f2f4;
    }
`
import styled from "styled-components";

export const UserInfoBackground = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`
export const UserInfoContainer = styled.div`
    position: absolute;
    top: 16em;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    height:56%;
    background: #fff;
    box-sizing: border-box;
    padding: 0 8em;
    @media screen and (max-width:1080px){
        width: 65%;
        padding: 0 5em;
    }
    @media screen and (max-width:800px){
        width: 72%;
        padding: 0 4em;
    }
    @media screen and (max-width:700px){
        width: 85%;
        padding: 0 4em;
    }
    @media screen and (max-width:480px){
        width: 100%;
        padding: 0 2em;
    }
`
export const UserInfoHeader = styled.div`
    display: flex;
    width: 100%;
    margin: 6em 0 .5em;
    justify-content: space-between;
    border-bottom: 1px solid #c4c4c4;
    padding-bottom: 1.5em;
    >h2{
        display: flex;
        align-items: flex-end;
    }

    .user-info-name{
        color: #2862e5;
    }
`
export const UserInfoUpdate = styled.div`
    
`
export const UserInfoForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    >hr{
        margin-top: 2.5em;
        border: none;
        background: #c4c4c4;
        width: 100%;
        height: 1px;
    }
`
export const UserInfoBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;
    margin-top: 2em;
    >input{
        width: 70%;
        border: none;
        border: 1px solid #c4c4c4;
        padding: 10px 5px;
        box-sizing: border-box;
        margin-top: 3px;
        background: #fafafa;
        color: #17191d;
        &:focus{
                outline: none;
                border: 1px solid #2862e5;
            }
        @media screen and (max-width:600px){
            width: calc(100% - 100px);
        }
    }
    >.user-info-arrange{
        width: 30%;
        @media screen and (max-width:600px){
            width: 100px;
        }
    }
`
export const UserInfoLabel = styled.label`
    box-sizing: border-box;
    width: 30%;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    @media screen and (max-width:800px){
        font-size: 1.3em;
    }
    @media screen and (max-width:600px){
        width: 100px;
    }
`

export const UserInfoNickname = styled.input.attrs(props => ({
    type: "text",
    id:"nickName"
}))`
`
export const UserInfoPwd = styled.input.attrs(props => ({
    type: "password",
    id:"curPassword"
}))`
`
export const UserInfoEditPwd = styled.input.attrs(props => ({
    type: "password",
    id:"changePassword"
}))`
`
export const UserInfoChkPassword = styled.input.attrs(props => ({
    type: "password",
    id:"checkPassword"
}))`
`
export const UserInfoSubmitBtn = styled.button.attrs(props => ({
    type: "submit",
}))`
    width: 200px;
    border: none; 
    padding: 10px 5px;
    box-sizing: border-box;
    margin-top: 20px;
    background: #2862e5;
    color: #fff;
    font-size: 15px;
    border-radius: 4px;
    &:hover{
        background: #0952e5
    }
    &:disabled{
        /* background: rgba(40, 98, 229, 0.6);
        opacity: .8; */
        background: #a6a9af;
        cursor: auto;
    }
`
export const UserInfoSnsLogined = styled.p`
    
`
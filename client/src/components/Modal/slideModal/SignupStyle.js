import styled from "styled-components"

export const LogoContainer =styled.div`
  width: 25rem; 
  height: 20rem;
  align-items: center;
  margin-bottom: 2.5rem;
  > img{
    position: relative;
    width: 100%; 
    top: 50%;
    margin: auto;
    cursor: pointer;
  }
  @media screen and (max-width : 767px){
    width: 20rem; 
    height: 16rem;
    margin-bottom: 2.0rem;
  }
  @media screen and (max-width : 424px){
    width:15rem; 
    height: 12rem;
    margin-bottom: 1.5rem;
  }
`;
export const InputBtnContainer =styled.div`
  position:relative;
  left: 2.5rem;
  display: flex;
  align-items: center;
  color: #fff;
  margin-bottom: 3.5rem; //<- responisive
`;
export const BtnContainer = styled.div`
  width: 7.0rem;
  height: 3rem;
  margin-top: 1.2rem;
  margin-left: 1.5rem;
  text-align: center;
  padding: 0.2rem;
  button{
    width:100%;
    height: 100%;
    padding: 0.5rem;
    color: #fff;
    font-size: 1.5rem;
    display: inline-block;
    border-radius: 1.2rem;
    border: 1px solid #fff;

  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  .signup-input{
    width: 28rem; 
    height: 3rem;
    margin: 0.5rem; // responsive 
    font-size: 1.6rem;
    color: #fff;
    background-color: #5b81fa;
    border: none;
    border-bottom: solid 0.5px #fff;
    transition: 0.4s;
    &:focus{
      transition: 0.2s;
      outline: none;
      border-bottom: 1px solid #fff;
    }
    &::placeholder{
      color: #fff;
    }
    &::placeholder:hover{
      opacity: 0;
    }
    @media screen and (max-width : 767px){
      width: 24rem;
      height: 2.3rem;
      margin-top: 0.2rem;
      font-size: 1.2rem
    }
    @media screen and (max-width : 424px){
      width: 18rem;
      height: 1.2rem;
      margin-top: 0.2rem;
      font-size: 1rem;
    }
  }
  @media screen and (max-width : 767px){
    margin-top: 0.2rem
  }
  @media screen and (max-width : 424px){
    margin-top: 0.2rem;
  }
`;

export const LoginError = styled.div`
  height: 1.5rem;
  font-size: 1.6rem;
  color: #F74306; 
  color: #F6DBD8;
  color: #fff;
  margin-top: 1.5rem;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    margin-left: 1rem;
    margin-top: 1.2rem;

  }  
  @media screen and (max-width: 424px) {
    font-size: 1.1rem;
  }
  `;

export const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin:3.5rem auto;
  /* background:cornflowerblue; */
  @media screen and (max-width: 787px){
    margin:1.5rem auto;
  }
  button{
    color: #757575;
    background-color:#fff;
    border: 1px solid #d9d9d9;
    border-radius: 0.7rem;
    height: 4rem;
    width: 28rem;
    margin: 0.5rem;
    font-size: 1.6rem;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      font-size: 1.3rem;
      margin-left: 1rem;
      width: 22rem;
      height: 3.5rem;
    }
  }
  .login-btn{
    background-color: #fff;
    color: #757575;
  }
  .login-btn-active{
    background-color: cornflowerblue;
    color: #fff;
  }
  .kakao-btn{
    background-color: #FFE650;
  }
  .google-btn{
    background-color: #252525;
    color: #fff;
  }
`;

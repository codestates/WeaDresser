import styled from "styled-components"
import { FiArrowLeftCircle } from 'react-icons/fi'
import { animated } from "@react-spring/web";


export const SignupBackModal = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index : 1;
`;


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

export const InputContainer = styled(animated.div)`
  width: ${({ width })=> width || '40em'};
  height: ${({ height })=> height || '3em'};
  display: flex;
  align-items: center;
  text-align: center;
  color: #fff;
  margin: 1em;
  @media screen and (max-width : 767px){
    width: 30em;
    margin-top: 0.2em
  }
  @media screen and (max-width : 424px){
    width: 30em;
  }
  input{
    /* width: 23em; */
    width : ${({width}) => width || '23em'} ;
    height: 1.5em;
    margin: 0.5em; // responsive 
    /* font-size: 2.8em; */
    font-size: ${({size})=> size|| '1.8em'};
    color: #fff;
    background-color: #5b81fa;
    border: none;
    border-bottom: solid 0.5px #fff;
    transition: 0.4s;
    &:focus{
      /* transition: 0.2s; */
      outline: none;
      background-color: #5b81fa;
      border-bottom: 1px solid #fff;
    }
    &::placeholder{
      color: #fff;
      font-size:1em;
    }
    &::placeholder:hover{
      opacity: 0;
    }
    @media screen and (max-width : 767px){
      width: 18em; 
      width: ${({ width })=> width || '18em'};
      height: 2em;
      margin-top: 0.2rem;
      font-size: 1.6rem
      
    }
    @media screen and (max-width : 424px){
      width: 16em;
      margin-left: 5em;
      height: 1.2rem;
      padding: 0.2em;
      font-size: 1.2rem;
    }
  }
`;

export const InputButton = styled.div`
    width: 8em;
    padding: 0.5em 0.3em;
    margin-left:1.5em;
    margin-top: 1.5em;
    color: #fff;
    font-size: 1.5em;
    display: inline-block;
    text-align: center;
    cursor:pointer;
    border-radius: 1em;
    border: 0.5px solid rgba(255,255,255,0.5);
    
    &:hover{ background-color:#fff; color: #000; }  
    @media screen and (max-width : 767px){
      width: 6.5em;
      font-size: 1.1em;
      padding: 0.5em 0.4em;
      margin-top: 1.5em;
      margin: 1.5em auto;
    }
    @media screen and (max-width : 424px){
      width: 5em;
      margin: 0 auto;
      font-size: 1em;
      padding: 0.4em 0.2em;

    }

`;

export const InputContainer2 = styled(InputContainer)`
  margin : 1em auto;
  width: 32em;
  margin-bottom: 1.8em;  
  /* border : 1px solid coral;  */
  input{
    font-size:1.8em;
    width : 30em;
    margin: 1em auto;
    @media screen and (max-width : 767px){
      margin : .8em auto;
      width : 20em;
      font-size: 1.2em;
    }
    @media screen and (max-width : 424px){
        margin: .2em auto;
        width : 15em;
        /* border: 1px solid coral; */
        font-size: .8em;
      }
  }
  @media screen and (max-width : 767px){
    margin : .8em auto;
    width : 20em;
  }
  @media screen and (max-width : 424px){
      margin: .6em auto;
      width : 18em;
      font-size: 1.2em;
    }
`; 

export const ErrPtag = styled.div`
  width: ${({width}) => width || '20em'};
  height: ${({height}) => height || '1em'};
  color: #fff;
  text-align: center;
  margin-top: ${({ margin }) => margin|| '1.8em'}; // responsive 
  font-size: ${({ size }) => size||'1.8em'};
  animation: smoothAppear 1s;
  @media screen and (max-width : 767px){
    /* height: 1.8em; */
    width: ${({width}) => width || '18em'};
    height: ${({height}) => height || '1em'};
    margin-top: ${({ margin }) => margin|| '1em'}; // responsive 
    font-size: 1.5rem;
  }
  @media screen and (max-width : 424px){
    /* width: 18rem; */
    /* height: 1.2rem; */
    width: ${({width}) => width || '18em'};
    height: ${({height}) => height || '1em'};
    margin-top: ${({ margin }) => margin|| '1.5em'}; // responsive 
    font-size: 1.3rem;
  }
  @keyframes smoothAppear {
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export const BackButton = styled(FiArrowLeftCircle)`
  width: 2.5rem; height: 2.5rem;
  padding: 1.5em;
  z-index:1000000000000000000000000; // <-- cursor pointer 왜 안됨;;?
  color: #fff;
  cursor: pointer; 
  position:absolute;
  top: 1rem; left: 1rem;

  &:hover{
    cursor: pointer; 
    color:coral;
  }
  @media screen and (max-width : 767px){
    width: 2.5rem; height: 2.5rem;
  
  }
  @media screen and (max-width : 424px){
    width: 1.5rem; height: 1.5rem;
  }
`;

export const BackContainer = styled(ErrPtag)`
  position: relative;
  width:100%;
  /* border: 1px solid coral; */
  margin: .8em auto; 
  .toLoginBtn{
    position: relative;
    top: -1em; left: 0;
    width :1.8em; height: 1.8em;
  }
  p{
    color: #fff;
  }

`;

export const FormContainer = styled(animated.div)`
  width: 40em;
  padding-top: 5em;
  background-color: transparent;
  text-align: center;
  button{
    width: 8em;
    font-size: 1.6em;
    padding: 0.5em 0.3em;
    color: #fff;
    border: .5px solid #fff;
    border-radius: 5px; 
    margin-bottom: 1.6em;
    &:hover{
      color:black;
      background-color: #fff;
    }
    @media screen and (max-width : 767px){
      width: 6em;
      font-size: 1.4em;
      padding: 0.4em 0.2em;
      color: #fff;
      border: .5px solid #fff;
      border-radius: 5px; 
    }
    @media screen and (max-width : 424px){
      margin: 0 auto;
      margin-bottom: 10em;
      width: 5em;
      font-size: 1em;
      color: #fff;
      border: .5px solid #fff;
      border-radius: 5px; 
    }
  };
  @media screen and (max-width : 767px){
  }
  @media screen and (max-width : 424px){
    margin: 0 auto;
    padding-top: 1em;
  }

`;
export const EmailDiv = styled(animated.div)`
  width : 30em; height: 2em;
  margin: 0 center;
  margin-top: 4em;
  margin-bottom: 1em;
  text-align: center;
  font-size: 2.4em;
  color: #fff;
  @media screen and (max-width : 767px){
    font-size: 2em;
    margin-top: 3.5em;
  }
  @media screen and (max-width : 424px){
    font-size: 1.7em;
    margin-top: 3em;
  }
`;

export const ErrP  = styled.p`
  width: 100%;
  font-size:1.3em;
  color: red;
  opacity: 0.7;
`;

export const RadioContainer =styled.div`
  width: 32em;
  margin: 2.2em auto;
  /* border: 1px solid coral; */
  input{
    width: 3.4em;
  margin: 1.5em auto;
  }
  span{
    font-size:1.5em;
    color: #ffffff;
  }
  @media screen and (max-width : 767px){
  }
  @media screen and (max-width : 424px){
    margin: 0 auto;
    margin-bottom: .8em;
    width: 20em;
    font-size: .8em;
  }

`;


// export const BtnContainer = styled.div`
//   width: 7.0rem;
//   height: 3rem;
//   margin-top: 1.2rem;
//   margin-left: 1.5rem;
//   text-align: center;
//   padding: 0.2rem;
//   button{
//     width:100%;
//     height: 100%;
//     padding: 0.5rem;
//     color: #fff;
//     font-size: 1.5rem;
//     display: inline-block;
//     border-radius: 1.2rem;
//     border: 1px solid #fff;

//   }
// `;


// export const InputBtnContainer =styled.div`
//   position:relative;
//   left: 2.5rem;
//   display: flex;
//   align-items: center;
//   color: #fff;
//   margin-bottom: 3.5rem; //<- responisive
// `;
import styled from 'styled-components'
import { animated } from '@react-spring/web';
import { MdClose } from 'react-icons/md'


export const ModalBackdrop = styled(animated.div)`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  position:fixed;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const ModalContainer = styled(animated.div)`
  width: 50rem;
  height: 60rem;
  box-shadow: 2px 5px 16px rgba(0,0,0, 0.2), -2px -5px -16px rgba(255, 255, 255, 0.883);
  background: #5b81fa;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  border-radius: 1.5rem;
  text-decoration: none;
  @media screen and (max-width : 767px){
    width: 40rem;
    height: 48rem;
  }
  @media screen and (max-width : 424px){
    width: 28rem;
    height: 35rem;
  }
`;

export const CloseModalButton = styled(MdClose)`
  width: 2.5rem; height: 2.5rem;
  padding: 1rem;
  /* background-color: black; */
  z-index:1000000000000000000000000; // <-- cursor pointer 왜 안됨;;?
  color: #fff;
  cursor: pointer; 
  position:absolute;
  top: 1rem; right: 1rem;
  &:hover{
    cursor: pointer; 
    color:coral;
  }
`;


import React from "react";
import styled, {keyframes} from "styled-components";

export const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
	top:0;
	left:0;
  z-index: 9;
`;
const boxFade = keyframes`
  from {transform: rotate(0deg); }
  to {transform: rotate(360deg);}
`

export const Spinner  = styled.div`
  box-sizing: border-box;
  position: absolute;
  /* top: 50%; */
  bottom: 2em;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #f19022;
  border-bottom-color: #f19022;
  animation: ${boxFade} .8s ease infinite;
`;

function LoadingIndicator() {
    return (
      <LoadingWrap>
        <Spinner></Spinner>
      </LoadingWrap>
    );
  }
  
  export default LoadingIndicator;
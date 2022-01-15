import styled from "styled-components";
import {
  flexbox,
  centered,
  link,
  greyBorder,
  shadow,
  vcentered,
  hcentered,
  mt,
  ml,
  p,
  m,
  w,
  mr,
  fontSize,
  mw,
  mb,
  hoverMixin,
  bg
} from "./mixins";
import { Link } from "react-router-dom";
import { Alert, Dialog } from "@mui/material";

export const Container = styled.div`
  ${flexbox};
  ${centered};
  ${(props) => props.shadow && shadow}
  ${(props) => props.greyBorder && greyBorder}
  ${(props) => props.mt && mt}
  ${(props) => props.ml && ml}
  ${(props) => props.mr && mr}
  ${(props) => props.m && m}
  ${(props) => props.p && p}
  ${(props) => props.w && w}
  ${(props) => props.mw && mw}
  ${props => props.bg && bg}
`;

// TODO: HIDE SCROLL BAR, BUT STILL ALLOW SCROLLING.

export const MainWindow = styled.div`
  ${flexbox};
  ${vcentered};
  width: ${props => props.desktop ? "calc(100vw - 230px)" : "100%"};
  min-height: 100vh;
  margin-left: ${props => props.desktop ? "230px" : ""};
  z-index: 0;
  /* ${props => props.verticalMiddle && hcentered} */
`;

export const Heading = styled.h1`
  font-size: ${props => props.phone ? "2.7rem" : props.desktop ? "3.6rem" : "3.2rem"};
  color: ${props => props.color ? props.color : "blue"};
  text-align: ${props => props.textAlign ? props.textAlign : "center"};
  padding-left: 10px; 
  padding-right: 10px; 
  
`;

export const SmallHeading = styled.h2`
  ${p}
  ${m}
  font-size: ${props => props.size ? props.size : "2.5rem"};
  color: ${props => props.color ? props.color : "blue"};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.laptop
      ? props.desktop
        ? "repeat(3, minmax(100px, 1fr))"
        : "repeat(2, minmax(100px, 1fr))"
      : "repeat(1, minmax(100px, 1fr))"};
  grid-auto-rows: auto;
  gap: ${props =>
    props.laptop ? props.desktop ? "60px" : "30px" : "15px"};
`;

export const ButtonLink = styled(Link)`
  ${link}
`;

export const TextLink = styled.u`
  ${link}
  color: blue;
  ${flexbox}
  ${centered}
  ${mt}
  ${ml}
  ${p}
`;

// custom settings for MUI modal backdrop
export const StyledModal = styled(Dialog)`
  z-index: 20;
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(1px);
  }
`;

export const StyledAlert = styled(Alert)`
  position: absolute;
  top: 0px;
  width: 70%;
  transform: translate(-50%);
`;

export const Text = styled.p`
  display: flex;
  flex-direction: row;
  ${(props) => props.p && p}
  ${(props) => props.m && m}
  ${(props) => props.fontSize && fontSize}
`;

export const ErrorText = styled.span`
  color: ${props => props.color ? props.color : "red"};
`;

export const TextBold = styled.strong`
  /* margin-top: 50px; */
  /* margin-bottom: 50px; */
  line-height: ${(props) => (props.lh ? props.lh : "2.5")};
  ${(props) => props.mr && mr}
  ${(props) => props.mt && mt}
  ${(props) => props.mb && mb}
  ${(props) => props.p && p}
  ${(props) => props.fontSize && fontSize}
`;

export const BackWrapper = styled.div`
  position: fixed;
  top: 2px;
  left: ${props => props.desktop ? "220px" : "0px"};
`;

export const HoverBox = styled(Container)`
  ${hoverMixin}
  border-radius: 10px;
  width: 100%;
  border-radius: ${props => props.rounded ? props.rounded : "6px"};
`;

export const ButtonScroll = styled.div`
  position: fixed;
  ${flexbox}
  ${centered}
   border-radius: 15%;
  width: 50px;
  right: 20px;
  bottom: 80px;
  height: 50px;
  z-index: 10;
  cursor: pointer;
  color: white;
  background: rgb(0, 120, 250);
  transition: opacity ease-in 1s, transform ease-in-out 1s, background ease 0.2s;
  &:hover {
    background: rgb(0, 50, 180);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.9);
    transform: translateY(-5%);
  }

  @keyframes inAnimation {
    0% {
      opacity: 0;
      transform: translateY(200%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes outAnimation {
    0% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 0;
      transform: translateY(200%);
    }
  }
`;

export const Widget = styled(Container)`
  padding: 12px;
  width: 300px;
  height: 300px;
  /* overflow: none; */
  overflow-x: hidden;
  overflow-y: scroll;
  ${(props) => props.bg && bg}
`;

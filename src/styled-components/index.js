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
  mb,
  hoverMixin,
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
`;

export const Widget = styled(Container)`
  width: 300px;
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
`

export const MainWindow = styled.div`
  ${flexbox};
  ${vcentered};
  width: calc(100vw - 230px);
  min-height: 100vh;
  margin-left: 230px;
  ${(props) => props.verticalMiddle && hcentered}
`;

export const Heading = styled.h1`
  font-size: 3.6rem;
  color: ${(props) => (props.color ? props.color : "blue")};
`;

export const SmallHeading = styled.h2`
  ${p}
  ${m}
  font-size: ${(props) => (props.size ? props.size : "2.5rem")};
  color: ${(props) => (props.color ? props.color : "blue")};
`;

export const Grid = styled.div`
  display: grid;
  /* grid-template-rows: repeat(3, minmax(100px, 1fr)); */
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-auto-rows: auto;
  gap: 50px;
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
  margin: 0;
`;

export const ErrorText = styled.span`
  color: ${props => props.color ? props.color : "red"};
`

export const TextBold = styled.strong`
  margin-top: 50px;
  margin-bottom: 50px;
  line-height: ${props => props.lh ? props.lh : "2.5"};
  ${(props) => props.mr && mr}
  ${(props) => props.mt && mt}
  ${(props) => props.mb && mb}
`;

export const BackWrapper = styled.div`
  position: fixed;
  top: 30px;
  left: 250px;
`

export const HoverBox = styled(Container)`
  ${hoverMixin}
  border-radius: 10px;
  width: 100%;
  border-radius: ${props => props.rounded ? props.rounded : "6px"}
`
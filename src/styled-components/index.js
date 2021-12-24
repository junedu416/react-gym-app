// import { css } from 'styled-components'; // turn this into a 1-liner?
import styled from "styled-components";
import { flexbox, centered, link, greyBorder, shadow, mt, vcentered, hcentered } from "./mixins";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";

export const Container = styled.div`
  ${flexbox};
  ${centered};
  ${props => props.shadow && shadow }
  ${props => props.greyBorder && greyBorder }
  ${props => props.mt && mt }
`;

export const MainWindow = styled.div`
  ${flexbox};
  ${vcentered};
  width: calc(100vw - 230px);
  min-height: 100vh;
  margin-left: 230px;
  ${props => props.verticalMiddle && hcentered}
`;

export const Heading = styled.h1`
  font-size: 3.6rem;
  color: ${(props) => (props.color ? props.color : "blue")};
`;

export const SmallHeading = styled.h2`
  font-size: ${props => props.size ? props.size: "2.5rem"};
  padding: 0;
  margin: 0 0 20px 0;
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

// custom settings for MUI modal backdrop
export const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(1px);
  }
`;

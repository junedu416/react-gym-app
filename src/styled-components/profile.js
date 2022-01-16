import styled from "styled-components";
import {
  shadow,
  p,
  m,
  w,
} from "./mixins";

export const ProfileImage = styled.img`
  ${props => props.shadow && shadow}
  ${props => props.m && m}
  ${props => props.p && p}
  ${props => props.w && w}
  width: ${props => props.width ? props.width : "200px"};
  height: ${props => props.height ? props.height : "200px"}
  object-fit: cover;
  /* width: 200px;
  height: 200px; */
  border-radius: 50%;
  margin-bottom: 20px;
`;

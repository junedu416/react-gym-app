import styled from "styled-components";
import {
  shadow,
  p,
  m,
  w,
  h,
} from "./mixins";

export const ProfileImage = styled.img`
  ${props => props.shadow && shadow}
  ${props => props.m && m}
  ${props => props.p && p}
  width: ${props => props.w ? props.w : "200px"};
  height: ${props => props.h ? props.h : "200px"}
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: ${props => props.mb ? props.mb : "20px"};
`;

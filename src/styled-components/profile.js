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
} from "./mixins";

export const ProfileImage = styled.img`
  ${(props) => props.shadow && shadow}
  ${(props) => props.m && m}
  ${(props) => props.p && p}
  ${(props) => props.w && w}
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

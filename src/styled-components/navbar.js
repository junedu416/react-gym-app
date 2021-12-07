import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexbox, centered, middle, mt } from './mixins';

export const NavBarLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  padding: 15px 40px;
  ${flexbox};
  ${centered};
  margin: 0 5px;
  color: rgb(48, 255, 62);
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

export const Nav = styled.div`
  height: 80px;
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  /* background-color: rgba(10, 10, 10, 1); */
  background-color: rgba(0, 0, 0, 1);
`

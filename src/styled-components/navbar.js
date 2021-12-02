import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBarLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  padding: 15px 20px;
  margin: 0 20px;
  color: green;
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
`

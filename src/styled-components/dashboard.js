import styled from "styled-components";
import { flexbox, centered, hoverMixin, backgroundColor } from "./mixins";

export const CardStyle = styled.div`
  ${flexbox};
  ${centered};
  ${hoverMixin};
  ${backgroundColor};
  width: ${props => props.desktop ? "360px" : "300px"};
  height: ${props => props.desktop ? "360px" : "300px"};
  border: 1px solid rgba(40, 100, 150, 0.07);
  box-shadow: 2px 2px 2px 0px rgba(40, 100, 150, 0.15);
  place-self: center stretch;
  border-radius: 10%;
`;

export const dashItem = {
   borderRadius: "7px",
   display: "flex",
   flexDirection: "row",
   justifyContent: "flex-start",
   minWidth: "210px",
} 
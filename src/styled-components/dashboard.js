import styled from "styled-components";
import { flexbox, centered, popupMiddle } from "./mixins";

export const CardStyle = styled.div`
  ${flexbox};
  ${centered};
  width: 300px;
  height: 300px;
  border: 1px solid rgba(180, 180, 180, 0.5);
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.45);
  place-self: center stretch;
  border-radius: 10%;
`;

export const dashItem = {
   color: "white",
   // border: "2px solid red",
   borderRadius: "7px",
   display: "flex",
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "flex-start",
   textTransform: "none",
   minWidth: "200px",
   "&:hover": {
      color: "red"
   },
   "&:selected": {
      color: "yellow",
   }

} 

// "&.Mui-selected": {
//    color: "rgba(57, 255, 30, 1)",
//    fontWeight: theme.typography.fontWeightBold,
//    transform: "scale(1.09) translateY(-2px)",
//  },
//  "&:hover": {
//    color: "rgba(57, 255, 45, 1)",
//    transform: "scale(1.1) translateY(-2px)",
//    transition: "0.2s"
//  },
//  "&.Mui-focusVisible": {
//    backgroundColor: "rgba(57, 255, 45, 0.25)",
//  },
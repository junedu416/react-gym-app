import styled from "styled-components";
import { flexbox, ml, p, shadow } from "./mixins";

export const WorkoutCardStyling = styled.div`
  ${flexbox};
  ${shadow};
  min-width: ${props => props.minWidth ? props.minWidth : "350px"};
  min-height: ${props => props.minHeight ? props.minHeight : "" };
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 5px;
  transition: all 0.4s;
  &:hover { 
    cursor: ${props => props.noHoverStyling ? "" : "pointer"};
    background-color: ${props => props.noHoverStyling ? "white" : "rgba(40, 145, 250, 0.14)"};
    transform: translate(0, -2px);
    box-shadow: 
      10px 10px 10px -6px rgba(120, 120, 120, 0.6),
      10px 15px 20px -6px rgba(120, 120, 120, 0.4);
  }
`

export const WorkoutList = styled.div`
  ${flexbox};
  flex-direction: row;
  align-items: center;
  width: calc(100% - 20px);
  justify-content: space-between;
  ${p}
  ${ml}
`

export const WorkoutText = styled.p`
  margin-bottom: ${props => props.mb ? props.mb : "10px"};
`

export const ListItems = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WorkoutDate = styled.p`
  align-self: flex-end;
  padding-top: 10px;
  margin: 0;
`

export const WorkoutUL = styled.ul`
  list-style-type: none;  /* removes bullet and indentation */
  padding: 0;
  margin: 0;
`

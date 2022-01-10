import styled from "styled-components";
import { flexbox, ml, p, shadow } from "./mixins";

export const WorkoutCardStyling = styled.div`
  ${flexbox};
  ${shadow};
  min-width: ${props => props.minWidth ? props.minWidth : "300px"};
  min-height: ${props => props.minHeight ? props.minHeight : "" };
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 5px;
`

export const WorkoutList = styled.div`
  text-transform: capitalize;
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
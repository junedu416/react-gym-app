import styled from "styled-components";
import { flexbox, ml, p, shadow } from "./mixins";

export const WorkoutCardStyling = styled.div`
  ${flexbox};
  ${shadow};
  width: 300px;
  height: 250px;
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 5px;
`

export const WorkoutList = styled.div`
  /* padding-left: 15px; */
  /* padding-right: 5px; */
  text-transform: capitalize;
  ${flexbox};
  flex-direction: row;
  align-items: center;
  width: calc(100% - 20px);
  justify-content: space-between;
  ${p}
  ${ml}
`
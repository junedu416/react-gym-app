import styled from "styled-components";
import { flexbox, centered, mt, pt, shadow } from "./mixins";

export const WorkoutCardStyling = styled.div`
  ${flexbox};
  ${shadow};
  width: 300px;
  height: 250px;
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 5px;
`

export const WorkoutList = styled.div`
  padding: 20px;
  align-self: flex-start;
  text-transform: capitalize;
`
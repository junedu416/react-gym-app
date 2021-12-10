import styled from "styled-components";
import { flexbox, centered, middle, mt, pt } from "./mixins";

export const ExerciseCardStyling = styled.div`
  ${flexbox};
  ${centered};
  width: 300px;
  height: 250px;
  border: 1px solid grey;
  border-radius: 12px;
`
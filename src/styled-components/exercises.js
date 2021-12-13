import styled from "styled-components";
import { flexbox, centered, mt, pt, shadow } from "./mixins";

export const ExerciseCardStyling = styled.div`
  ${flexbox};
  ${centered};
  width: 300px;
  height: 250px;
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 12px;
  ${shadow};
`
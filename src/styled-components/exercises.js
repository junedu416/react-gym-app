import styled from "styled-components";
import { flexbox, centered, shadow, p } from "./mixins";

export const ExerciseCardStyling = styled.div`
  ${flexbox};
  ${centered};
  width: 350px;
  height: 250px;
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 12px;
  ${p};
  ${shadow};
`
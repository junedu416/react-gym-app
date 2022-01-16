import styled from "styled-components";
import { flexbox, centered, shadow, p, hoverMixin } from "./mixins";

export const ExerciseCardStyling = styled.div`
  ${flexbox};
  ${centered};
  width: 350px;
  min-height: 250px;
  height: 100%;
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 12px;
  ${p};
  ${shadow};
  ${(props) => props.hoverMixin && hoverMixin};
`
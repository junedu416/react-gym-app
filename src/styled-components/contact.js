import styled from 'styled-components';
import { flexbox, centered, popupMiddle, mt, pt } from './mixins';

export const ContactSubheadings = styled.h3`
  font-size: 1.3rem;
  margin: 30px 0 15px 0;
  align-self: flex-start;
  color: red;  
  ${flexbox};
  flex-direction: row;
  ${centered};
`
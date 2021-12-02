import styled from 'styled-components';
// import { css } from 'styled-components'; // turn this into a 1-liner?
import { flexbox, centered, middle } from './mixins';

export const Container = styled.div`
   ${flexbox};
   ${centered}; 
`

export const Heading = styled.h1`
  font-size: 3.6rem;
  color: ${ props => props.color ? props.color : "blue"};  
`


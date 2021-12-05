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

export const Grid = styled.div`
  display: grid;
  /* grid-template-rows: repeat(3, 1fr); */
  grid-template-rows: repeat(3, minmax(100px, 1fr));
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  /* grid-auto-rows: ; */
  
  gap: 50px;
`


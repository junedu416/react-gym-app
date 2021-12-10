import styled from 'styled-components';
// import { css } from 'styled-components'; // turn this into a 1-liner?
import { flexbox, centered, middle, mt, pt } from './mixins';

export const Container = styled.div`
   ${flexbox};
   ${centered};
`
export const MainWindow = styled.div`
   ${flexbox};
   ${centered}; 
   ${pt}
`

export const Heading = styled.h1`
  font-size: 3.6rem;
  ${mt};
  color: ${ props => props.color ? props.color : "blue"};  
`

export const SmallHeading = styled.h2`
  font-size: 2.5rem;
  padding: 0;
  margin: 0 0 20px 0;
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


// import { css } from 'styled-components'; // turn this into a 1-liner?
import styled from 'styled-components';
import { flexbox, centered, popupMiddle, mt, pt, link } from './mixins';
import { Link } from "react-router-dom";

export const Container = styled.div`
   ${flexbox};
   ${centered};
`
export const MainWindow = styled.div`
   ${flexbox};
   ${centered}; 
   ${pt};
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
  /* grid-template-rows: repeat(3, minmax(100px, 1fr)); */
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-auto-rows: auto;
  gap: 50px;
`

export const ButtonLink = styled(Link)`
  ${link}
`
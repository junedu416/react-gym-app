import styled from 'styled-components';
import { flexbox, centered, middle } from './mixins';

export const Card = styled.div`
   ${flexbox};
   ${centered};
   width: 300px;
   height: 300px;
   box-shadow: 2px 2px 5px 2px rgba(0,0,0, 0.45);
   place-self: center stretch;
   border-radius: 12%;
`
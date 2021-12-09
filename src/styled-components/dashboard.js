import styled from 'styled-components';
import { flexbox, centered, middle } from './mixins';

export const CardStyle = styled.div`
   ${flexbox};
   ${centered};
   width: 300px;
   height: 300px;
   border: 1px solid rgba(180, 180, 180, 0.5);
   box-shadow: 2px 2px 2px 0px rgba(0,0,0, 0.45);
   place-self: center stretch;
   border-radius: 10%;
`
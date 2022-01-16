import styled from "styled-components";
import { flexbox, centered } from "./mixins";

export const ContactSubheadings = styled.h3`
  font-size: 1.3rem;
  margin: 30px 0 15px 0;
  align-self: flex-start;
  color: red;
  ${flexbox};
  flex-direction: row;
  ${centered};
`;

export const RedDot = styled.div`
  background-color: ${props => props.color ? props.color : "red"};
  border-radius: 100%;
  padding: 5px 14px;
  font-size: 1.4rem;
  color: white;
  margin-right: 6px;
`;

export const ShowPhoto = styled.img`
  margin-top: 20px;
`

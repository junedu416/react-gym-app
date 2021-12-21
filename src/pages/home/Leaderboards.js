import React from "react";
import { Container, Heading } from "../../styled-components/";

export const Leaderboards = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
      <Heading>Leaderboards</Heading>
    </Container>
  );
};
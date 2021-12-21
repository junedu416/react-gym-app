import React from "react";
import { Container, Heading } from "../../styled-components/";

export const Checkins = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
      <Heading>Check-ins</Heading>
    </Container>
  );
};

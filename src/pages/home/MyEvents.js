import React from "react";
import { Container, Heading } from "../../styled-components/";

export const MyEvents = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
      <Heading>My Events</Heading>
    </Container>
  );
};

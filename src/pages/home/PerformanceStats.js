import React, { useState } from "react";
import { Container, Heading } from "../../styled-components/";

export const PerformanceStats = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
      <Heading>Performance Stats</Heading>
    </Container>
  );
};

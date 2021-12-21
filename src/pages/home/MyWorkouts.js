import React, { useState } from "react";
import { Container, Heading } from "../../styled-components/";

export const MyWorkouts = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
      <Heading>My Workouts</Heading>
    </Container>
  );
};

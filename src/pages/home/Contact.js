import React, { useState } from "react";
import { Heading, Container } from "../../styled-components/";

export const Contact = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
        <Heading>Contact</Heading>
    </Container>
  );
};

export const EquipmentReports = (props) => {
    
  return (
    <Container>
        <Heading>Equipment Reports</Heading>
    </Container>
  );
};

export const BehaviourReports = (props) => {

  return (
    <Container>
        <Heading>Behaviour Reports</Heading>
    </Container>
  );
};
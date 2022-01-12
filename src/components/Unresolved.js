import React, { useState } from "react";
import { Container, Text, TextBold } from "../styled-components";
import { RedDot } from "../styled-components/contact";

const Unresolved = ({ text: unresolvedNumber }) => {
  function determineColor() {
    if (unresolvedNumber === 0) return "blue";
    else return "red";
  }

  return (
    <Container direction="row" justify="flex-start" w="100%">
      <RedDot color={determineColor}>{unresolvedNumber}</RedDot>
      <TextBold mt="0" mb="0" lh mr="6px" style={{ color: determineColor() }}>
        Unresolved Reports
      </TextBold>
    </Container>
  );
};

export default Unresolved;

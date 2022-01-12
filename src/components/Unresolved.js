import React from "react";
import { Container, Text, TextBold } from "../styled-components";
import { RedDot } from "../styled-components/contact";

const Unresolved = ({ text }) => {
  return (
    <Container direction="row" justify="flex-start" w="100%">
    <RedDot>{text}</RedDot>
      <TextBold
        mt="0"
        mb="0"
        lh
        mr="6px"
        style={{ color: "red" }}
      >
        
        Unresolved Reports</TextBold>
    </Container>
  );
};

export default Unresolved;

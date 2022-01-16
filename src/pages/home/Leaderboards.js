import React from "react";
import { Container, Heading } from "../../styled-components/";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const Leaderboards = (props) => {
  useRedirectUnauthorisedUser();
  return (
    <Container>
      <Heading>Leaderboards</Heading>
    </Container>
  );
};

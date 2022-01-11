import React from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const Leaderboards = (props) => {
  useRedirectUnauthorisedUser();
  return (
    <MainWindow>
      <Container>
        <Heading>Leaderboards</Heading>
      </Container>
    </MainWindow>
  );
};

import React from "react";
import { Container, Heading, MainWindow } from "../../styled-components";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const MeetTheTeam = (props) => {
  useRedirectUnauthorisedUser();
  return (
    <MainWindow>
      <Heading>Meet The Team</Heading>
      <Container>
        
      </Container>
    </MainWindow>
  );
};

import React from "react";
import { Container, Heading } from "../../styled-components";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const MeetTheTeam = (props) => {
  useRedirectUnauthorisedUser();
  return (
    <Container>
      <Heading>Meet The Team</Heading>
    </Container>
  );
};

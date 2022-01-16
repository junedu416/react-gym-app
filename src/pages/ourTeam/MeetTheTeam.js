import React from "react";
import { Container, Heading } from "../../styled-components";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { StaffCard } from "./StaffCard";

export const MeetTheTeam = (props) => {
  useRedirectUnauthorisedUser();
  return (
    <Container>
      <Heading desktop>Meet The Team</Heading>

      <StaffCard />
    </Container>
  );
};

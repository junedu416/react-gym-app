import React from "react";
import { Container, Grid, Heading } from "../../styled-components";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { StaffCard } from "./StaffCard";
import useMediaQuery from "@mui/material/useMediaQuery";

export const MeetTheTeam = (props) => {
  useRedirectUnauthorisedUser();

  const laptop = useMediaQuery("(min-width:1023px)");
  const desktop = useMediaQuery("(min-width:1400px)");

  return (
    <Container>
      <Heading>Meet The Team</Heading>
      <Container>
      <Grid laptop={laptop} desktop={desktop}>
        <StaffCard />
        <StaffCard />
        <StaffCard />
        <StaffCard />
        <StaffCard />
        <StaffCard />
      </Grid>
      </Container>
    </Container>
  );
};

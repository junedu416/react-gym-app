import React, { useState, useEffect } from "react";
import { Container, Grid, Heading } from "../../styled-components";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { StaffCard } from "./StaffCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getStaffProfiles } from "../../services/profileServices";
import { GreyText } from "../../styled-components/widgets";

export const MeetTheTeam = () => {
  useRedirectUnauthorisedUser();
  const [staffProfs, setStaffProfs] = useState([])

  const laptop = useMediaQuery("(min-width:1023px)");
  const desktop = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    getStaffProfiles()
    .then(response => {
      console.log("fetched staff profiles:", response)
      setStaffProfs(response)
    }).catch(e => console.log("error:", e))
  }, [])

  return (
    <Container>
      <Heading>Meet The Team</Heading>
      <Container>
        {staffProfs.length === 0 && <GreyText>No Staff Profiles Available</GreyText>}
      <Grid laptop={laptop} desktop={desktop}>
        {staffProfs.map((staff, index) => staff.description?.length > 0 ? <StaffCard key={index} staff={staff} /> : null)}
      </Grid>
      </Container>
    </Container>
  );
};

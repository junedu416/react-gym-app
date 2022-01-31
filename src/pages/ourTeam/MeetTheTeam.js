import React, { useState, useEffect } from "react";
import { Container, Grid, Heading } from "../../styled-components";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { StaffCard } from "./StaffCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getStaffProfiles } from "../../services/profileServices";
import { GreyText } from "../../styled-components/widgets";
import { SkeletonStaffCard } from "./SkeletonStaffCard";

export const MeetTheTeam = () => {
  useRedirectUnauthorisedUser();
  const [staffProfs, setStaffProfs] = useState([]);

  const laptop = useMediaQuery("(min-width:1023px)");
  const desktop = useMediaQuery("(min-width:1400px)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getStaffProfiles()
      .then((response) => {
        console.log("fetched staff profiles:", response);
        setStaffProfs(response);
        setLoading(false);
      })
      .catch((e) => console.log("error:", e));
  }, []);

  return (
    <Container>
      <Heading>Meet The Team</Heading>
      <Container>
        <Grid laptop={laptop} desktop={desktop}>
          {loading ? (
            <>
              <SkeletonStaffCard />
              <SkeletonStaffCard />
              <SkeletonStaffCard />
              <SkeletonStaffCard />
              <SkeletonStaffCard />
              <SkeletonStaffCard />
            </>
          ) : (
            staffProfs.length === 0 && (
              <p>There are no staff profiles available</p>
            )
          )}
          {staffProfs.map((staff, index) => {
            return staff.description?.length > 20 ? (
              <StaffCard key={index} staff={staff} />
            ) : null;
          })}
        </Grid>
      </Container>
    </Container>
  );
};


import React from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import {
  Container,
  Grid,
  Heading,
  MainWindow,
  SmallHeading,
} from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";
import CheckInWidget from "../../widgets/CheckInWidget.js";
import ReportWidget from "../../widgets/ReportWidget";
import { useRedirectUnauthorisedUser } from "../../config/customHooks.js";


export const Overview = (props) => {
  useRedirectUnauthorisedUser();
  const { store } = useGlobalState();
  const { profile } = store;

  return (
    <MainWindow>
      <Container>
        <Heading>
          Welcome back, {profile ? profile.firstName : "user"}
        </Heading>
        <Grid>
          <CardStyle><CheckInWidget /></CardStyle>
          <CardStyle />
          <CardStyle />
          <CardStyle><ReportWidget /></CardStyle>
          <CardStyle />
          <CardStyle />
        </Grid>
      </Container>
    </MainWindow>
  );
};

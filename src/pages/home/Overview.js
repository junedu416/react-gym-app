import React from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import {
  Container,
  Grid,
  MainWindow,
  SmallHeading,
} from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";
import CheckInWidget from "../../widgets/CheckInWidget.js";

export const Overview = (props) => {
  const { store } = useGlobalState();
  const { profile } = store;

  return (
    <MainWindow verticalMiddle>
      <Container>
        <SmallHeading>
          Welcome back {profile ? profile.firstName : "user"}, here's your
          overview
        </SmallHeading>
        <Grid>
          <CardStyle><CheckInWidget /></CardStyle>
          <CardStyle />
          <CardStyle />
          <CardStyle />
          <CardStyle />
          <CardStyle />
        </Grid>
      </Container>
    </MainWindow>
  );
};

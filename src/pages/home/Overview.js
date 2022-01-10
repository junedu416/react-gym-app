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

export const Overview = (props) => {
  const { store } = useGlobalState();
  const { profile } = store;

  return (
    <MainWindow>
      <Container>
        <Heading>
          Welcome back, {profile ? profile.firstName : "user"}
        </Heading>
        <Grid>
          <CardStyle />
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

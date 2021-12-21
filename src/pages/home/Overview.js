import React from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import { Container, Grid, MainWindow, SmallHeading } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

export const Overview = (props) => {

  const {store} = useGlobalState();
  const {profile} = store;

  return (
    <MainWindow>
      <SmallHeading>Welcome back { profile ? profile.firstName : "user" }, here's your overview</SmallHeading>
      <Grid>
        <CardStyle />
        <CardStyle />
        <CardStyle />
        <CardStyle />
        <CardStyle />
        <CardStyle />
      </Grid>
    </MainWindow>
  );
};

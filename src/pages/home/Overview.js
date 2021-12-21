import React, { useState } from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import { Container, Grid, SmallHeading } from "../../styled-components";

export const Overview = (props) => {
  return (
    <Container style={{
        width: "calc(100vw - 230px)",
        float: "right",
        marginTop: "80px"
      }}>
      <SmallHeading>Welcome back USER, here's your overview</SmallHeading>
      <Grid>
        <CardStyle />
        <CardStyle />
        <CardStyle />
        <CardStyle />
        <CardStyle />
        <CardStyle />
      </Grid>
    </Container>
  );
};

import React, { useState } from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import { Container, Grid, Heading } from "../../styled-components";

export const Overview = (props) => {
  return (
    <Container>
      <h2>Welcome back NAME, here's your overview</h2>
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

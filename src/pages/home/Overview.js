import React, { useState } from "react";
import { Card } from "../../styled-components/dashboard.js";
import { Container, Grid } from "../../styled-components";
export const Overview = (props) => {
  return (
    <Container>
      <Grid>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </Container>
  );
};

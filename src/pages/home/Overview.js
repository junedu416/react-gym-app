import React, { useState } from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import { Container, Grid } from "../../styled-components";
export const Overview = (props) => {
  return (
    <Container>
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

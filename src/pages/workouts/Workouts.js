import React, { useState } from "react";
import StartWorkout from "../../components/buttons/StartWorkout";
import { Container, Heading } from "../../styled-components";

export const Workouts = (props) => {
    
  return (
    <Container>
      <Heading>
        Workouts
      </Heading>
      <StartWorkout />
    </Container>
  );
};

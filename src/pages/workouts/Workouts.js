import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import StartWorkout from "../../components/buttons/StartWorkout";
import { Container, Heading } from "../../styled-components";

export const Workouts = (props) => {
    
  return (
    <Container>
      <Heading>
        Workouts
      </Heading>
      <EditButton />
      <StartWorkout />
    </Container>
  );
};

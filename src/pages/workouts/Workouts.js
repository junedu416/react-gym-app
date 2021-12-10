import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import StartWorkout from "../../components/buttons/StartWorkout";
import { Container, Heading, MainWindow } from "../../styled-components";
import { Exercises } from "./Exercises";

export const Workouts = (props) => {
  return (
    <MainWindow>
      <Container>
        <Heading>Workouts</Heading>
        <EditButton />
        <StartWorkout />
        <p>Trainer Workouts</p>
        <p>Create Workout</p>
      </Container>
      <Container>
        <Exercises />
      </Container>
    </MainWindow>
  );
};

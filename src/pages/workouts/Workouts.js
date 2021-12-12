import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import StartWorkout from "../../components/buttons/StartWorkout";
import { Container, Heading, MainWindow } from "../../styled-components";

export const Workouts = (props) => {
    
  return (
    <MainWindow>
      <Heading>
        Workouts
      </Heading>
      <EditButton />
      <StartWorkout />
    </MainWindow>
  );
};

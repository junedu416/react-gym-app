import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import ViewExercises from "../../components/buttons/ViewExercises";
import StartWorkout from "../../components/buttons/StartWorkout";
import { Container, Heading, MainWindow } from "../../styled-components";
import { WorkoutCardStyling } from "../../styled-components/workouts";
import CreateWorkout from "../../components/buttons/CreateWorkout";

export const Workouts = (props) => {
  const workoutList = ["Workout A", "Workout B", "Workout C"];

  return (
    <MainWindow>
      <Container>
        <Heading>Workouts</Heading>
        <EditButton />
        <Container>
          {workoutList.map((workout) => {
            <WorkoutCardStyling>
              {workout}
            </WorkoutCardStyling>
          })}
        </Container>
        <StartWorkout />
        <p>Trainer Workouts</p>
        <CreateWorkout />
        <ViewExercises />
      </Container>
    </MainWindow>
  );
};

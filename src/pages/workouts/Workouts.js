import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import ViewExercises from "../../components/buttons/ViewExercises";
import StartWorkout from "../../components/buttons/StartWorkout";
import { Container, Heading, SmallHeading, MainWindow, Grid } from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import CreateWorkout from "../../components/buttons/CreateWorkout";
import Divider from "@mui/material/Divider";
import { ContactSubheadings } from "../../styled-components/contact";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Workouts = (props) => {
  const workoutList = [
    { name: "Workout A", exercises: ["deadlift", "bench", "squat"] },
    {
      name: "Workout B",
      exercises: ["Exercise 1", "Exercise 2", "Exercise 3"],
    },
    { name: "Workout C", exercises: ["row", "run", "swim"] },
  ];

  workoutList.map((workout) => console.log(workout.name, workout.exercises));

  return (
    <MainWindow>
      <Container>
        <Heading>Workouts</Heading>
        <EditButton />

        <Container>
          <Grid>
            {workoutList.map((workout) => {
              return (
                <WorkoutCardStyling>
                  <SmallHeading style={{padding:"10px 0 0px 10px", fontSize:"1.5rem"}}>{workout.name}</SmallHeading>

                  {workout.exercises.map((exercise) => {
                    return (
                      <Container>
                        <WorkoutList>
                          <p>{exercise}</p>
                          <ArrowForwardIosIcon />
                        </WorkoutList>
                        <Divider sx={{width:"90%"}}/>
                      </Container>
                    );
                  })}
                </WorkoutCardStyling>
              );
            })}
          </Grid>
        </Container>
        <StartWorkout />
        <p>Trainer Workouts</p>
        <CreateWorkout />
        <ViewExercises />
      </Container>
    </MainWindow>
  );
};

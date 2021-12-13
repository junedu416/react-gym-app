import React, { useState } from "react";
import EditButton from "../../components/buttons/Edit";
import ViewExercises from "../../components/buttons/ViewExercises";
import StartWorkout from "../../components/buttons/StartWorkout";
import {
  Container,
  Heading,
  SmallHeading,
  MainWindow,
  Grid,
} from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import CreateWorkout from "../../components/buttons/CreateWorkout";
import Divider from "@mui/material/Divider";
import { ContactSubheadings } from "../../styled-components/contact";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import TrainerWorkouts from "../../components/buttons/TrainerWorkouts";

export const Workouts = (props) => {
  const workoutList = [
    {
      name: "Workout A",
      exercises: [
        { name: "deadlift", sets: 1, reps: 5, distance: null },
        { name: "bench", sets: 3, reps: 5, distance: null },
        { name: "squat", sets: 5, reps: 5, distance: null },
      ],
    },
    {
      name: "Workout B",
      exercises: [
        { name: "Exercise 1", sets: 3, reps: 10, distance: null },
        { name: "Exercise 2", sets: 3, reps: 8, distance: null },
        { name: "Exercise 3", sets: 1, reps: 5, distance: null },
      ],
    },
    {
      name: "Workout C",
      exercises: [
        { name: "Row", sets: null, reps: null, distance: "500m" },
        { name: "Run", sets: null, reps: null, distance: "8km" },
        { name: "Swim", sets: null, reps: null, distance: "800m" },
      ],
    },
  ];

  // workoutList.map((workout) => console.log(workout.name, workout.exercises));

  const [activeWorkout, setActiveWorkout] = useState("");
  const handleClick = (selectWorkout) => {
    if (selectWorkout !== null) {
      setActiveWorkout(selectWorkout);
    }
  };

  return (
    <MainWindow>
      <Container>
        <Heading>Workouts</Heading>

        <Container>
          <Grid>
            {workoutList.map((workout, index) => {
              return (
                <Container>
                  <EditButton />
                  <WorkoutCardStyling value={index} onClick={handleClick}>
                    <SmallHeading
                      style={{ padding: "10px 0 0px 10px", fontSize: "1.5rem" }}
                    >
                      {workout.name}
                    </SmallHeading>

                    {workout.exercises.map((exercise) => {
                      return (
                        <Container>
                          <WorkoutList>
                            <p>{exercise.name}</p>
                            {exercise.sets === null ? null : (
                              <span style={{ display: "flex", width: "30px" }}>
                                <p>{exercise.sets}</p>
                                <p
                                  style={{
                                    textTransform: "lowercase",
                                    padding: "0 5px",
                                  }}
                                >
                                  {"x"}
                                </p>
                                <p>{exercise.reps}</p>
                              </span>
                            )}
                            {exercise.distance === null ? null : (
                              <p>{exercise.distance}</p>
                            )}
                            <IconButton>
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </WorkoutList>
                          <Divider sx={{ width: "90%" }} />
                        </Container>
                      );
                    })}
                  </WorkoutCardStyling>
                  <StartWorkout />
                </Container>
              );
            })}
          </Grid>
        
        <TrainerWorkouts />
        <CreateWorkout />
        <ViewExercises />
        </Container>
      </Container>
    </MainWindow>
  );
};

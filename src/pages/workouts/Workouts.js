import React, { useState } from "react";
import { useNavigate } from "react-router";
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
// import { ContactSubheadings } from "../../styled-components/contact";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import TrainerWorkouts from "../../components/buttons/TrainerWorkouts";
import { workoutList } from "../../data/workouts-dummy";

export const Workouts = (props) => {
  const navigate = useNavigate();
  
  const [activeWorkout, setActiveWorkout] = useState("");
  const handleClick = (selectedWorkout) => {
    if (selectedWorkout !== null) {
      setActiveWorkout(selectedWorkout);
    }
  };

  console.log(activeWorkout);

  function workoutStart() {
    navigate("/workouts/start");
  }

  function editWorkout(workout) {
    navigate(`/workouts/edit`)
    // navigate(`/workouts/edit?${workout}`)
  }


  return (
    <MainWindow>
      <Container>
        <Heading>Workouts</Heading>

        <Container>
          <Grid>
            {workoutList.map((workout, index) => {
              return (
                <Container>
                  <EditButton 
                    btnFunction={editWorkout}
                  />
                  <WorkoutCardStyling value={index} onClick={handleClick}>
                    <SmallHeading
                      p="10px 0 0 20px"
                      m="0 0 10px"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {workout.name}
                    </SmallHeading>

                    {workout.exercises.map((exercise) => {
                      return (
                        <Container>
                          <WorkoutList p="0 5px 0 15px">
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
                  <StartWorkout btnFunction={workoutStart} />
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

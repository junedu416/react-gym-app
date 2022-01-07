import React, { useState } from "react";
import { useNavigate } from "react-router";
import EditButton from "../../components/buttons/Edit";
import {
  Container,
  Heading,
  SmallHeading,
  MainWindow,
  Grid,
  ButtonLink,
} from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
// import { ContactSubheadings } from "../../styled-components/contact";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import { workoutList } from "../../data/workouts-dummy";
import BasicButton from "../../components/buttons/BasicButton";

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
    navigate(`/workouts/edit`);
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
                  <EditButton btnFunction={editWorkout} />
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
                  <BasicButton
                    text="Start Workout"
                    variant="outlined"
                    style={{
                      color: "lime",

                      marginTop: "25px",
                      border: "1.7px solid lime",
                      borderRadius: "6px",
                      opacity: "0.8",
                      "&:hover": { opacity: "1", color: "red" },
                    }}
                    btnFunction={workoutStart}
                  />
                  {/* <StartWorkout btnFunction={workoutStart} /> */}
                </Container>
              );
            })}
          </Grid>

          <ButtonLink to="/workouts/trainer-workouts">
            <BasicButton text="Trainer Workouts" />
          </ButtonLink>

          <ButtonLink to="/workouts/new">
            <BasicButton text="Create Workout" />
          </ButtonLink>

          <ButtonLink to="/exercises">
            <BasicButton
              text="View Exercises"
              variant="outlined"
              color="error"
              // style={{
              //   color: "lime",
              //   borderColor: "lime",
              //   borderRadius: "6px",
              // }}
            />
          </ButtonLink>
        </Container>
      </Container>
    </MainWindow>
  );
};

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
  StyledAlert,
  Text, 
  TextLink
} from "../../styled-components";
import { Collapse } from "@mui/material";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getExerciseById } from "../../services/exerciseServices";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";

export const Workouts = (props) => {

  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile} = store;

  const [activeWorkout, setActiveWorkout] = useState("");
  const handleClick = (selectedWorkout) => {
    if (selectedWorkout !== null) {
      setActiveWorkout(selectedWorkout);
    }
  };

  const navigateToLogin = () => {
    navigate("/auth/login");
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
      {!profile && (
        <Collapse in={display}>
          <StyledAlert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDisplay(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            <Text>
              Please
              <TextLink mt="0" p="0 6px" onClick={navigateToLogin}>
                login
              </TextLink>
              to view workout
            </Text>
          </StyledAlert>
        </Collapse>
      )}

      {profile && <Container>
        <Heading>Workouts</Heading>

        <Container>
          <Grid>
            {profile.workouts.map((workout, index) => {
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
                            {console.log(exercise)}
                            <p>{exercise.exerciseId.name}</p>
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
      </Container>}
    </MainWindow>
  );
};

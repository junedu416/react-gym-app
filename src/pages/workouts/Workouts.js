import React, { useState, useEffect } from "react";
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
  TextLink,
} from "../../styled-components";
import { Collapse } from "@mui/material";
import {
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import CloseIcon from "@mui/icons-material/Close";

import BasicButton from "../../components/buttons/BasicButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { ReusableModal } from "../../components/ReusableModal";
import { displayUnits } from "../../utils/workoutFunctions";

export const Workouts = () => {
  useRedirectUnauthorisedUser();
  const [open, setOpen] = useState(false);
  const initialWorkout = {
    name: null,
    exercises: [],
  };
  const [newWorkout, setNewWorkout] = useState(initialWorkout);
  const [display, setDisplay] = useState(true);
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (profile) {
      editProfile(profile.userId, profile).catch((err) => {
        console.log(err.message);
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const workoutObj = {
      ...newWorkout,
      name: event.target.value,
    };
    setNewWorkout(workoutObj);
  };

  const handleCreateBtn = () => {
    console.log(newWorkout);
    dispatch({ type: "addNewWorkout", data: newWorkout });
    dispatch({
      type: "setNotification",
      data: "Successfully Create New Workout",
    });
    setOpen(false);
  };

  const [activeWorkout, setActiveWorkout] = useState([]);

  const handleClick = (selectedWorkout) => {
    setActiveWorkout(selectedWorkout);
  };

  const navigateToLogin = () => {
    navigate("/auth/login");
  };

  function workoutStart(index) {
    dispatch({ type: "selectWorkout", data: index });
    navigate("/workouts/start");
  }

  function editWorkout(index) {
    dispatch({ type: "selectWorkout", data: index });
    navigate("/workouts/edit");
  }

  const activeStyle = {
    borderLeft: activeWorkout ? "6px solid lime" : "",
  };

  console.log("active workout: ", activeWorkout);

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

      {profile && (
        <Container>
          <Heading>Workouts</Heading>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Create Workout List
            </Button>
          </div>
          {profile.workouts.length === 0 && (
            <Text>
              You don't have a workout list yet! Click the button above to
              create your first workout
            </Text>
          )}
          <Container>
            <Grid>
              {profile.workouts.map((workout, index) => {
                return (
                  <Container>
                    {activeWorkout === index && (
                      <EditButton
                        btnFunction={() => editWorkout(index)}
                        hoverStyling={{ "&:hover": { color: "lime" } }}
                      />
                    )}
                    <WorkoutCardStyling
                      onClick={() => handleClick(index)}
                      style={{
                        borderLeft:
                          activeWorkout === index
                            ? "6px solid lime"
                            : "6px solid transparent",
                      }}
                    >
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
                            <WorkoutList
                              p="0 25px 0 15px"
                              style={{ alignItem: "space-evenly" }}
                            >
                              {exercise.exerciseId ? (
                                <p>{exercise.exerciseId.name}</p>
                              ) : (
                                <p>{exercise.customisedName}</p>
                              )}

                              <Container direction="row">
                                {exercise.sets === null || 0 ? null : (
                                  <Container direction="row">
                                    <p>{exercise.sets}</p>
                                    <Text
                                      style={{
                                        textTransform: "none",
                                        padding: "16px 5px",
                                      }}
                                    >
                                      x
                                    </Text>
                                    <Text>
                                      {exercise.reps === null || 0
                                        ? null
                                        : exercise.reps}
                                    </Text>
                                  </Container>
                                )}
                                <Container ml="40px">
                                  <Text>
                                    {exercise.weight === null || 0
                                      ? null
                                      : `${exercise.weight}kg`}
                                    {exercise.distance === null || 0 ? null : (
                                      <Text>
                                        {displayUnits(exercise.distance)}
                                      </Text>
                                    )}
                                  </Text>
                                </Container>
                              </Container>
                            </WorkoutList>
                            <Divider sx={{ width: "90%" }} />
                          </Container>
                        );
                      })}
                    </WorkoutCardStyling>
                    {activeWorkout === index && (
                      <BasicButton
                        text="Start Workout"
                        variant="outlined"
                        sx={{
                          color: "lime",
                          mt: 2,
                          border: "1.7px solid lime",
                          borderRadius: "6px",
                          opacity: "0.8",
                          "&:hover": {
                            opacity: "1",
                            color: "#444",
                            backgroundColor: "lime",
                            borderColor: "lime",
                            boxShadow: "0 2px -6px rgba(0, 0, 0, 0.08)",
                          },
                        }}
                        btnFunction={() => workoutStart(index)}
                      />
                    )}
                  </Container>
                );
              })}
            </Grid>

            <ButtonLink to="/workouts/trainer-workouts">
              <BasicButton text="Trainer Workouts" />
            </ButtonLink>

            <ButtonLink to="/exercises">
              <BasicButton
                text="View Exercises"
                variant="outlined"
                color="error"
              />
            </ButtonLink>
          </Container>

          {/* Popup Modal to create Workout */}
          <ReusableModal />
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Workout"
                helperText="Please enter your workout list name"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreateBtn}>Create</Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </MainWindow>
  );
};

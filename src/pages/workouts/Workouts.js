import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EditButton from "../../components/buttons/Edit";

import {
  Container,
  Heading,
  SmallHeading,
  Grid,
  ButtonLink,
  StyledAlert,
  Text,
  TextLink,
} from "../../styled-components";

import {
  //BlackBackground,
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";

import { Collapse } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import CloseIcon from "@mui/icons-material/Close";
import BasicButton from "../../components/buttons/BasicButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { ReusableModal } from "../../components/ReusableModal";
import { displayUnits } from "../../utils/workoutFunctions";
// import Workoutbgimg from "../../assets/workouts.jpg";
// import { WorkoutsBackground } from "../../styled-components/workouts";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Workouts = () => {
  useRedirectUnauthorisedUser();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const laptop = useMediaQuery("(min-width:1000px)");
  const desktop = useMediaQuery("(min-width:1400px)");

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
    dispatch({ type: "addNewWorkout", data: newWorkout });
    dispatch({
      type: "setNotification",
      data: "Successfully Create New Workout",
    });
    setOpen(false);

    dispatch({ type: "selectWorkout", data: profile.workouts.length });
    navigate(`/workouts/edit`);
  };

  const [activeWorkout, setActiveWorkout] = useState(0);

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

  return (
    <>
      {/* <Container direction="row">
        <BlackBackground />
        <WorkoutsBackground src={Workoutbgimg} />
      </Container> */}
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

      {/* ============================================================ lime color heading */}
      {profile && (
        <Container mb="100px">
          <Heading style={{ color: "#0d47a1" }}>Workouts</Heading>
          <Container direction="row">
            <BasicButton
              text="Create Workout"
              variant="outlined"
              color="primary"
              btnFunction={handleClickOpen}
            />

            <ButtonLink to="/workouts/trainer-workouts">
              <BasicButton
                text="Trainer Workouts"
                color="primary"
                variant="outlined"
              />
            </ButtonLink>
          </Container>

          {profile.workouts.length === 0 && (
            <Text>
              You don't have any workouts yet! <br />
              To get started, click on the Create Workout button.
            </Text>
          )}
          <Container
            style={{ justifyContent: "flex-start" }}
            justify="flex-start"
          >
            <Grid desktop={desktop} laptop={laptop}>
              {profile.workouts.map((workout, index) => {
                return (
                  <Container justify="flex-start" h={!mobile && "100%"}>
                    {activeWorkout === index ? (
                      <EditButton
                        btnFunction={() => editWorkout(index)}
                        color="#0d47a1"
                        hoverStyling={{ "&:hover": { color: "#0d47a1" } }}
                      />
                    ) : (
                      <div style={{ height: "60px" }}>&nbsp;</div>
                    )}
                    {/* Empty Div above offsets the space so the workouts don't jump up and down when the edit
                         button is rendered/not rendered.
                      */}

                    <WorkoutCardStyling
                      onClick={() => handleClick(index)}
                      bg="#3F3F3F"
                      style={{
                        //color: "white",
                        borderLeft:
                          activeWorkout === index
                            ? "6px solid #0d47a1"
                            : "6px solid transparent",
                      }}
                    >
                      {/* ================================== NEED TO CHANGE TO MUI HEADING LEAVE HERE */}
                      <SmallHeading
                        p="10px 0 0 20px"
                        m="0 0 10px"
                        style={{ fontSize: "1.5rem", color: "#0d47a1" }}
                      >
                        {workout?.name}
                      </SmallHeading>

                      {workout.exercises.map((exercise, index) => {
                        return (
                          <Container key={index}>
                            <WorkoutList p="0 25px 0 15px">
                              {exercise.exerciseId ? (
                                <Text>{exercise.exerciseId.name}</Text>
                              ) : (
                                <Text>{exercise.customisedName}</Text>
                              )}

                              <Container direction="row">
                                {exercise.sets === null || 0 ? null : (
                                  <Container direction="row">
                                    <Text>{exercise.sets}</Text>
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
                                  </Text>
                                  <Text>
                                    {exercise.distance === null || 0
                                      ? null
                                      : displayUnits(exercise.distance)}
                                  </Text>
                                </Container>
                              </Container>
                            </WorkoutList>
                            <Divider sx={{ width: "90%" }} />
                          </Container>
                        );
                      })}
                    </WorkoutCardStyling>
                    {activeWorkout !== index ? (
                      <div style={{ height: "79px" }}>&nbsp;</div>
                    ) : profile.workouts[activeWorkout].exercises.length ===
                      0 ? (
                      <BasicButton
                        text="Add Exercises"
                        btnFunction={() => editWorkout(index)}
                        sx={{ mt: 3, mb: 0 }}
                      />
                    ) : (
                      <BasicButton
                        text="Start Workout"
                        variant="outlined"
                        sx={{
                          color: "#0d47a1",
                          mt: 3,
                          mb: 0,
                          border: "1.7px solid #0d47a1",
                          borderRadius: "6px",
                          opacity: "0.8",
                          "&:hover": {
                            opacity: "1",
                            color: "white",
                            backgroundColor: "#0d47a1",
                            border: "2.5px solid #0d47a1",
                            boxShadow:
                              "3px 5px 6px -2px rgba(160, 160, 160, 0.6)",
                          },
                        }}
                        btnFunction={() => workoutStart(index)}
                      />
                    )}
                  </Container>
                );
              })}
            </Grid>
          </Container>

          {/* Popup Modal to create Workout */}
          <ReusableModal
            open={open}
            handleClose={handleClose}
            subtitle={
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
            }
            actionButtons={
              <>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreateBtn}>Create</Button>
              </>
            }
          />
        </Container>
      )}
    </>
  );
};

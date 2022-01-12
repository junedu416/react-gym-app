import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Heading,
  HoverBox,
  MainWindow,
  TextLink,
} from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
  ListItems,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Button, ClickAwayListener } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ReusableModal } from "../../components/ReusableModal";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { ExerciseEditForm } from "./ExerciseEditForm";
import BasicButton from "../../components/buttons/BasicButton";

export const EditWorkouts = () => {
  useRedirectUnauthorisedUser();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile, workoutIndex } = store;
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // clare
  const workoutList = profile.workouts[workoutIndex];
  // end clare
  const choosePath = ["Add From Popular Exercises", "Add Customized Exercise"];

  useEffect(() => {
    if (profile) {
      editProfile(profile.userId, profile).catch((err) => {
        console.log(err.message);
      });
    }
  }, [profile]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const modalText = `Are you sure you want to delete this workout?`;
  const actionButtons = [
    <Container mt="40px" direction="row">
      <BasicButton
        color="error"
        sx={{ mr: 5 }}
        onClick={handleWorkoutDelete}
        text="Delete"
      />
      <BasicButton color="info" onClick={handleClose} text="Cancel" />
    </Container>,
  ];

  function handleWorkoutDelete() {
    const workoutsClone = [...profile.workouts];
    workoutsClone.splice(workoutIndex, 1);
    dispatch({ type: "setWorkout", data: workoutsClone });
    dispatch({ type: "setNotification", data: "Delete workout successfully!" });
    navigate("/workouts");
  }

  function handleAddExerciseBtn(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    if (event.target.getAttribute("value") === choosePath[0]) {
      navigate("/exercises");
    } else navigate("/workouts/new");
  };

  const [formOpen, setFormOpen] = useState("");
  function handleFormOpen(exerciseId) {
    setFormOpen(exerciseId);
  }

  function deleteExercise(exercise) {
    const newWorkout = workoutList.exercises.filter(
      (el) => el._id !== exercise._id
    );
    const profileWorkouts = profile.workouts;
    profileWorkouts[workoutIndex].exercises = newWorkout;

    dispatch({ type: "setWorkout", data: profileWorkouts });
    console.log("the profile workouts are:", profile.workouts);
  }

  function handleFinishEditing() {
    navigate("/workouts");
  }

  return (
    <>
      <MainWindow>
        <Container>
          {workoutList && (
            <>
              <Heading>{workoutList.name}</Heading>
              <Container>
                <WorkoutCardStyling>
                  <ul
                    style={{
                      // Removes bullet and indentation
                      listStyleType: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {workoutList.exercises.map((exercise) => (
                      <ListItems>
                        <WorkoutList p="10px 0px" ml="20px">
                          {exercise.exerciseId
                            ? exercise.exerciseId.name
                            : exercise.customisedName}
                          <IconButton>
                            <EditIcon
                              sx={{ "&:hover": { color: "lime" } }}
                              onClick={() => {
                                handleFormOpen(exercise.exerciseId);
                              }}
                            />
                            <ExerciseEditForm
                              open={formOpen === exercise.exerciseId}
                              setFormOpen={setFormOpen}
                              exercise={exercise}
                              workoutIndex={workoutIndex}
                            />
                            <DeleteIcon
                              sx={{ "&:hover": { color: "red" } }}
                              onClick={() => deleteExercise(exercise)}
                              style={{ marginLeft: "20%", marginRight: "30%" }}
                            />
                          </IconButton>
                        </WorkoutList>
                        <Divider sx={{ width: "90%" }} />
                      </ListItems>
                    ))}
                  </ul>
                  <HoverBox align="flex-start" rounded="4px">
                  <TextLink
                    direction="row"
                    ml="25px"
                    mt="0"
                    p="20px 0"
                    justify="flex-start"
                    onClick={handleAddExerciseBtn}
                  >
                    <AddCircleIcon sx={{ mr: 1 }} /> Add Exercise
                  </TextLink>
                  </HoverBox>
                </WorkoutCardStyling>
                <Menu
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2, width: "300px" }}>
                    {choosePath.map((el, i) => (
                      <Container align="flex-start">
                        <Divider width="90%" sx={{ ml: 2 }} />
                        <HoverBox align="flex-start">
                          <MenuItem
                            key={i}
                            id={i}
                            value={el}
                            onClick={handleMenuClose}
                            sx={{ pt: 3, pb: 3, width:"100%" }}
                          >
                            <AddCircleIcon sx={{ mr: 1 }} /> {el}
                          </MenuItem>
                        </HoverBox>
                        <Divider width="90%" sx={{ ml: 2 }} />
                      </Container>
                    ))}
                  </Typography>
                </Menu>
              </Container>
            </>
          )}
        </Container>
        <br />
        <Container direction="row">
          <BasicButton
            variant="outlined"
            color="error"
            btnFunction={handleModalOpen}
            text="Delete Workout"
          />
          <BasicButton btnFunction={handleFinishEditing} text="Done" />
        </Container>
      </MainWindow>
      <ReusableModal
        title={modalText}
        open={modalOpen}
        handleClose={handleClose}
        children={actionButtons}
      />
    </>
  );
};

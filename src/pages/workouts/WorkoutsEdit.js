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
  WorkoutUL,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ReusableModal } from "../../components/ReusableModal";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { ExerciseEditForm } from "./ExerciseEditForm";
import BasicButton from "../../components/buttons/BasicButton";
import { DeleteWorkout } from "./DeleteWorkout";
import ClickAwayListener from '@mui/material/ClickAwayListener';

export const EditWorkouts = () => {
  useRedirectUnauthorisedUser();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile, workoutIndex } = store;
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const workoutList = profile.workouts[workoutIndex];
  const choosePath = ["Add From Popular Exercises", "Add Customized Exercise"];


  // WILL USE THIS 
  // const [searchParams, setSearchParams] = useSearchParams();
  // searchParams.get("workoutIndex");

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

  function handleAddExerciseBtn(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    if (event.target.getAttribute("value") === choosePath[0]) {
      navigate(`/exercises`);
      // navigate(`/exercises?${searchParams}`);
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

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MainWindow>
        <Container>
          {workoutList && (
            <>
              <Heading>{workoutList.name}</Heading>
              <Container>
                <WorkoutCardStyling noHoverStyling>
                  <WorkoutUL>
                    {workoutList.exercises.map((exercise) => (
                      <ListItems>
                        <WorkoutList p="10px 0px" ml="20px">
                          {exercise.exerciseId
                            ? exercise.exerciseId.name
                            : exercise.customisedName}
                            <Container direction="row">
                          <IconButton>
                            <EditIcon
                              sx={{ "&:hover": { color: "lime" } }}
                              onClick={() => {
                                handleFormOpen(exercise.exerciseId);
                              }}
                            />
                          </IconButton>
                          <ExerciseEditForm
                            open={formOpen === exercise.exerciseId}
                            setFormOpen={setFormOpen}
                            exercise={exercise}
                            workoutIndex={workoutIndex}
                          />
                          <IconButton>
                            <DeleteIcon
                              sx={{ mr: 1, "&:hover": { color: "red" } }}
                              onClick={() => deleteExercise(exercise)}
                            />
                          </IconButton>
                          </Container>
                        </WorkoutList>
                        <Divider sx={{ width: "90%" }} />
                      </ListItems>
                    ))}
                  </WorkoutUL>
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
                      <ClickAwayListener onClickAway={handleClickAway}>
                      <HoverBox align="flex-start">
                        {/* <Divider width="90%" sx={{ ml: 2 }} /> */}
                        <HoverBox align="flex-start">
                          <MenuItem
                            key={i}
                            id={i}
                            value={el}
                            onClick={handleMenuClose}
                            sx={{ pt: 3, pb: 3, width: "100%" }}
                          >
                            <AddCircleIcon sx={{ mr: 1 }} /> {el}
                          </MenuItem>
                        </HoverBox>
                        {/* <Divider width="90%" sx={{ ml: 2 }} /> */}
                      </HoverBox>
                      </ClickAwayListener>
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
        title="Are you sure you want to delete this workout?"
        open={modalOpen}
        handleClose={handleClose}
      ><DeleteWorkout handleClose={handleClose} /></ReusableModal>
    </>
  );
};

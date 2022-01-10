import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Heading,
  MainWindow,
  TextLink,
} from "../../styled-components";
import {
  WorkoutCardStyling,
  WorkoutList,
  ListItems,
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button } from "@mui/material";
import { ReusableModal } from "../../components/ReusableModal";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";

export const EditWorkouts = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  // const [workoutRemove, setWorkoutRemove] = useState("");

  const { store, dispatch } = useGlobalState();
  const { profile, workoutId } = store;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const workoutList = profile.workouts.filter((workout) => workout._id === workoutId)


  const modalText = `Are you sure you want to delete this workout?`;
  const actionButtons = [
    <Container mt="40px" direction="row">
      <Button
        variant="contained"
        size="large"
        color="error"
        sx={{ mr: 5 }}
        onClick={handleDelete}
      >
         Delete
      </Button>
      <Button
        variant="contained"
        size="large"
        color="info"
        onClick={handleClose}
      >
        Cancel
      </Button>
    </Container>,
  ];

  useEffect(() => {
    if (profile){
      editProfile(profile.userId, profile)
      .catch((err) => {
        console.log(err.message);
      })
    }
  },[profile])

  function handleDelete() {
    // setEditMode(!editMode);
    const updatedWorkout = profile.workouts.filter((workout) => workout._id !== workoutId)
    dispatch({type: "deleteWorkoutout", data: updatedWorkout})
    dispatch({type: "setNotification", data: "Delete workout successfully!"})
    navigate("/workouts")
  }

  function editWorkout(workout) {
    // navigate(`/workouts/${workout.name}`);
  }

  function confirmationPopup(workout) {
    // setWorkoutRemove(workout);
    // handleOpen();
  }

  function handleRemove(removeWorkoutId) {
    // const newList = list.filter((workout) => workout.id !== removeWorkoutId);
    // setList(newList);
    // handleClose();
  }

  function handleClick() {
    navigate("/workouts/new");
  }

  

  return (
    <>
      <MainWindow>
        <Container>
          <Heading>{workoutList[0].name}</Heading>
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
                {workoutList[0].exercises.map((exercise) => (
                  <ListItems>
                    <WorkoutList p="10px 0px" ml="20px">
                      {exercise.name}
                      <IconButton>
                        {editMode ? (
                          <RemoveCircleIcon
                            sx={{ color: "red" }}
                            onClick={() => confirmationPopup(exercise)}
                          />
                        ) : (
                          <ArrowForwardIosIcon
                            onClick={() => editWorkout(exercise)}
                          />
                        )}
                      </IconButton>
                    </WorkoutList>
                    <Divider sx={{ width: "90%" }} />
                  </ListItems>
                ))}
              </ul>

              <TextLink
                direction="row"
                ml="25px"
                mt="0"
                p="20px 0"
                justify="flex-start"
                onClick={handleClick}
              >
                <AddCircleIcon sx={{ mr: 1 }} /> Add Exercise
              </TextLink>
            </WorkoutCardStyling>
          </Container>
          {editMode && (
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={() => setEditMode(false)}
            >
              Done
            </Button>
          )}
        </Container>
        <br/>
        <Button variant="outlined" color="error" onClick={handleClickOpen} >Delete Workout</Button>
      </MainWindow>
      <ReusableModal
        title={modalText}
        open={open}
        handleClose={handleClose}
        children={actionButtons}
      />
    </>
  );
};

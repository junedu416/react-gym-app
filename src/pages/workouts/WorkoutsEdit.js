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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ReusableModal } from "../../components/ReusableModal";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";

export const EditWorkouts = () => {
  useRedirectUnauthorisedUser();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile, workoutId } = store;
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const workoutList = profile.workouts.filter((workout) => workout._id === workoutId)
  const choosePath = ['Add From Popular Exercises', 'Add Customized Exercise'];

  useEffect(() => {
    if (profile){
      editProfile(profile.userId, profile)
      .catch((err) => {
        console.log(err.message);
      })
    }
  },[profile])

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const modalText = `Are you sure you want to delete this workout?`;
  const actionButtons = [
    <Container mt="40px" direction="row">
      <Button
        variant="contained"
        size="large"
        color="error"
        sx={{ mr: 5 }}
        onClick={handleWorkoutDelete}
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

  function handleWorkoutDelete() {
    const updatedWorkout = profile.workouts.filter((workout) => workout._id !== workoutId)
    dispatch({type: "setWorkout", data: updatedWorkout})
    dispatch({type: "setNotification", data: "Delete workout successfully!"})
    navigate("/workouts")
  }

  function handleAddExerciseBtn(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    if (event.target.getAttribute('value') === choosePath[0]){
      navigate("/exercises")
    } else (
      navigate("/workouts/new")
    )
  };

  function editExercise(exercise) {

  }

  function deleteExercise(exercise){
    const newWorkout = workoutList[0].exercises.filter((el) => el._id !== exercise._id);
    const listIndex = profile.workouts.findIndex(x => x._id===workoutId);
    const profileWorkouts = profile.workouts
    profileWorkouts[listIndex].exercises = newWorkout

    dispatch({type: 'setWorkout', data: profileWorkouts})
    console.log("the profile workouts are:",profile.workouts)
  }

  // function handleRemove(removeExerciseId) {
  //   const newList = workoutList[0].exercises.filter((exercise) => exercise.exerciseId !== removeExerciseId);
  //   // setList(newList);
  //   handleClose();
  // }

  return (
    <>
      <MainWindow>
        <Container>
          <Heading>{workoutList[0].name}  <Button><EditIcon/></Button></Heading>
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
                      {exercise.exerciseId? exercise.exerciseId.name: exercise.customisedName}
                      <IconButton>
                          <EditIcon
                            onClick={() => editExercise(exercise)}
                          />
                          <DeleteIcon onClick = {() => deleteExercise(exercise)} style={{marginLeft:"20%", marginRight:"30%"}}/>
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
                onClick={handleAddExerciseBtn}
              >
                <AddCircleIcon sx={{ mr: 1 }} /> Add Exercise
              </TextLink>
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
                      <MenuItem
                        key={i}
                        id={i}
                        value = {el}
                        onClick={handleMenuClose}
                      >
                        <AddCircleIcon sx={{ mr: 1 }} /> {el}
                      </MenuItem>
                  ))}
                  </Typography>
            </Menu>
          </Container>
          {/* {editMode && (
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={() => setEditMode(false)}
            >
              Done
            </Button>
          )} */}
        </Container>
        <br/>
        <Button variant="outlined" color="error" onClick={handleModalOpen} >Delete Workout</Button>
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

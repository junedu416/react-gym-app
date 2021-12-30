import React, { useState } from "react";
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
} from "../../styled-components/workouts";
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditButton from "../../components/buttons/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button } from "@mui/material";
import { workoutList } from "../../data/workouts-dummy";
import { ReusableModal, ReuseableModal } from "../../components/ReusableModal";

export const EditWorkouts = (props, workouts) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState(workoutList);
  const [workoutName, setWorkoutName] = useState("");
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const modalText = `Are you sure you want to delete ${workoutName}?`

  function handleEdit() {
    setEditMode(!editMode);
  }

  function editWorkout(workout) {
    navigate(`/workouts/${workout.name}`);
  }

  function confirmationPopup(workout) {
    setWorkoutName(workout.name);
    handleOpen();
  }

  function handleRemove(removeWorkoutId) {

    const newList = list.filter((workout) => workout.id !== removeWorkoutId);
    setList(newList);
  }

  function handleClick() {
 
    navigate("/workouts/new");
  }

  return (
    <>
      <MainWindow>
        <Container>
          <Heading>Workouts</Heading>

          <EditButton btnFunction={handleEdit} />
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
                {list.map((workout) => (
                  <li>
                    <WorkoutList p="10px 0px" ml="20px">
                      {workout.name}
                      <IconButton>
                        {editMode ? (
                          <RemoveCircleIcon
                            sx={{ color: "red" }}
                            onClick={() => confirmationPopup(workout)}
                          />
                        ) : (
                          <ArrowForwardIosIcon
                            onClick={() => editWorkout(workout)}
                          />
                        )}
                      </IconButton>
                    </WorkoutList>
                    <Divider sx={{ width: "90%" }} />
                  </li>
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
                <AddCircleIcon sx={{ mr: 1 }} /> Add Workout
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
      </MainWindow>
      <ReusableModal
        title={modalText}
        open={open}
        handleClose={handleClose}
        
      />
    </>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Divider, IconButton, TextField } from "@mui/material";
import EditButton from "../../components/buttons/Edit";
import { Container, Heading, MainWindow, TextLink } from "../../styled-components";
import {
  ListItems,
  WorkoutCardStyling,
  WorkoutList,
} from "../../styled-components/workouts";
import { AddCircle, ArrowForwardIos, RemoveCircle } from "@mui/icons-material";

export const NewWorkout = (props) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [workoutRemove, setWorkoutRemove] = useState("");

  function handleEdit() {
    setEditMode(!editMode);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // ADD BACKEND LOGIC TO CREATE WORKOUT
  }

  function handleClick() {
    navigate("/exercises");
  }

  function createWorkout() {}

  return (
    <MainWindow 
      // verticalMiddle
    >
      <Container>
      <Heading>Create Workout</Heading>
        <EditButton btnFunction={handleEdit} />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <WorkoutCardStyling>
            <TextField
              required
              id="workoutName"
              variant="filled"
              placeholder="Workout name"
              size="small"
              sx={{ width: "200px", ml: 2, mt: 1 }}
            />
            <ul
              style={{
                // Removes bullet and indentation
                listStyleType: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <ListItems>
                <WorkoutList p="10px 0px">
                  {/* Need to add logic to determine whether an exercise has been added or not and if so, then display the delete button */}
                  {editMode && (
                    <IconButton>
                      <RemoveCircle
                        sx={{ color: "red" }}
                        // onClick={() => confirmationPopup(workout)}
                      />
                    </IconButton>
                  )}

                  {/* This should appear last */}
                  <TextLink
                    direction="row"
                    ml="10px"
                    mt="0"
                    p="20px 0"
                    justify="flex-start"
                    onClick={handleClick}
                  >
                    <AddCircle sx={{ mr: 1 }} /> Add Exercise
                  </TextLink>
                </WorkoutList>
                <Divider sx={{ width: "90%" }} />
              </ListItems>
            </ul>
          </WorkoutCardStyling>
          <Button
            type="submit"
            variant="contained"

            size="large"
            sx={{ my: 5, width: "150px", height: "50px" }}
            onClick={createWorkout}
          >
            Done
          </Button>
        </form>
      </Container>
    </MainWindow>
  );
};

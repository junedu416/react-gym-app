import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Grid,
  Heading,
  MainWindow,
  SmallHeading
} from "../../styled-components";
import { ExerciseCardStyling } from "../../styled-components/exercises";
import { useGlobalState } from "../../config/globalStore";
import { getAllExercises } from "../../services/exerciseServices";
import { editProfile } from "../../services/profileServices";


import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
// import ToggleButton from "@mui/material/ToggleButton";
// import { Star, StarOutline } from "@mui/icons-material";
import BasicButton from "../../components/buttons/BasicButton";

export const Exercises = () => {
  // const [selected, setSelected] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const { store, dispatch } = useGlobalState();
  const { profile} = store;
  const initialValues = {
    exerciseId: null,
    sets: null,
    reps: null,
    weight: null,
    distance: null
  };

  const [newExercise, setNewExercise] = useState(initialValues);


  useEffect( async() => {
     const exercises = await getAllExercises()
     await setExerciseList(exercises)
     if (exerciseList.length !==0 ){
      setNewExercise({
            ...newExercise,
            exerciseId: exerciseList[exerciseIndex]._id,
            sets: exerciseList[exerciseIndex].defaultSets
              ? exerciseList[exerciseIndex].defaultSets
              : null,
            reps: exerciseList[exerciseIndex].defaultReps
              ? exerciseList[exerciseIndex].defaultReps
              : null,
            weight: exerciseList[exerciseIndex].defaultWeight
              ? exerciseList[exerciseIndex].defaultWeight
              : null,
            distance: exerciseList[exerciseIndex].defaultDistance
              ? exerciseList[exerciseIndex].defaultDistance
              : null
          })
     }
  }, [exerciseIndex]);

  const handleBtnClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setExerciseIndex(index)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();
  
  const containExercise = (list, newObj) => {
    for(var i = 0; i < list.length; i++) {
      if (list[i].exerciseId === newObj.exerciseId) {
        return true
      }
    }
    return false
  };

  const findWorkoutAddExercise = async (workouts, i, exercise) => {
    workouts[i].exercises.push(exercise)
    return workouts
  }

  
  //this function adds exercise to profile workout array
  const handleAddExercise = async (event) => {

    //select workout list
    setWorkoutIndex(Number(event.target.getAttribute("id")))

    if (containExercise(profile.workouts[workoutIndex].exercises, newExercise)) {
      dispatch({
        type: "setNotification",
        data: "You already have this exercise in your workout list"
      });
    } else {
      const workouts = await findWorkoutAddExercise(profile.workouts, workoutIndex, newExercise )
      dispatch({type: "addWorkoutToProfile", data: workouts});

      editProfile(profile.userId, profile)
      .then(() =>
        dispatch({
          type: "setNotification",
          data: "Add exercise successfully!"
        })
      )
      .catch((err) => {
        console.log(err.message);
      })
    }
};


  // const handleToggle = (selected) => {
  //   setSelected(!selected);
  //   if (selected === true) {
  //     // ====================================================================================
  //     // NEED BACKEND LOGIC
  //     // ADD TO FAVOURITES
  //     // ====================================================================================
  //   } else {
  //     // REMOVE FROM FAVOURITES
  //   }
  // };

  return (
    <MainWindow>
      <Heading>Select Exercise</Heading>
      {profile && (
        <Container>
          <Grid>
            {exerciseList.map((exercise, index) => (
              <ExerciseCardStyling
                p="10px 15px"
                justify="space-between"
                key={index}
              >
                <Container>
                  {/* <Container
                    direction="row"
                    justify="space-between"
                    style={{ width: "100%" }}
                  > */}
                    <SmallHeading style={{ fontSize: "1.3rem" }}>
                      {exercise.name}
                    </SmallHeading>

                    {/* <ToggleButton
                      disableRipple={true}
                      // value="check"     // Don't know if we need this or not.. 
                      selected={selected}
                      size="small"
                      // Removes button outline and background
                      style={{ border: "none", background: "none", "&:focus": { border: "none", outline: "none"} }}
                      onChange={() => {
                        handleToggle(selected);

                      }}
                    >
                      {selected ? <Star sx={{ fontSize:"2.5rem" }} /> : <StarOutline sx={{ fontSize:"2.5rem" }} />}
                    </ToggleButton>
                  </Container> */}

                  <p>{exercise.description}</p>
                </Container>

                <BasicButton
                  variant="contained"
                  btnFunction={(event) => handleBtnClick(event, index)}
                  text="Add To Workout"
                  style={{ marginBottom: "10px" }}
                />
                
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
                  <Typography sx={{ p: 2, width: "150px" }}>
                    {profile.workouts.map((el, i) => (
                      <MenuItem
                        key={i}
                        id={i}
                        onClick={handleAddExercise}
                      >
                        {el.name}
                      </MenuItem>
                  ))}
                  </Typography>
                </Menu>
              </ExerciseCardStyling>
            ))}
          </Grid>
        </Container>
      )}
    </MainWindow>
  );
};


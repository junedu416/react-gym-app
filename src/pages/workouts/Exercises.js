import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
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
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// ==== SPRINKLE   FAVOURITES ====
// import ToggleButton from "@mui/material/ToggleButton";
// import { Star, StarOutline } from "@mui/icons-material";
import BasicButton from "../../components/buttons/BasicButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const Exercises = () => {
  useRedirectUnauthorisedUser();

  const laptop =  useMediaQuery("(min-width:1024px)");
  const desktop = useMediaQuery("(min-width:1400px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(null);
  const { store, dispatch } = useGlobalState();
  const { profile, workoutIndex} = store;
  const initialValues = {
    exerciseId: null,
    sets: null,
    reps: null,
    weight: null,
    distance: null
  };

  console.log("Workout Index: ", workoutIndex)

  const [newExercise, setNewExercise] = useState(initialValues);
  const navigate = useNavigate();
  const addExerciseToWorkout = useCallback(async (workoutIndex) => {
    
    console.log("useCallback called. workoutIndex is", workoutIndex)
    if(!profile.workouts[workoutIndex]){
        dispatch({
          type: "setNotification",
          data: "Workout not found"
        });
      } else if (containExercise(profile.workouts[workoutIndex].exercises, newExercise)) {
        dispatch({
          type: "setNotification",
          data: "You already have this exercise in your workout list"
        });
      } else if (newExercise.exerciseId){
        const workouts = await findWorkoutAddExercise(profile.workouts, workoutIndex, newExercise );
        editProfile(profile.userId, {
          ...profile,
          workouts: workouts
        }).then((response) => {
          dispatch({type: "setProfile", data: response.data});
          dispatch({type: "setNotification", data: "Exercise added to workout"});
          navigate(-1);
        })
      }
    
  }, [profile, dispatch, newExercise, navigate])

  useEffect(() => {    
    if (exerciseList.length !==0 && exerciseList[exerciseIndex]){
      setNewExercise({
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
  }, [exerciseIndex, exerciseList]);

  useEffect(() => {
    //get all exercises from database:
    const  fetchExercises = async () => {
      const exercises = await getAllExercises();
      setExerciseList(exercises)
    }
    if(exerciseList.length === 0) {
      console.log("fetching exercise list from backend")
      fetchExercises().catch(console.error);
    }
  }, [exerciseList])

  const handleBtnClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setExerciseIndex(index)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const containExercise = (list, newObj) => {
    for(var i = 0; i < list.length; i++) {
      if (list[i].exerciseId&&list[i].exerciseId._id === newObj.exerciseId) {
        console.log('workoutIndex:', i)
        return true
      }
    }
    return false
  };

  const findWorkoutAddExercise = async (workouts, i, exercise) => {
    console.log("exercise being added", exercise);
    const workoutsClone = await JSON.parse(JSON.stringify(workouts));
    workoutsClone[i].exercises.push(exercise)
    console.log("workout update:", workouts)
    return workoutsClone
  }

  const handleAddExercise = async (event) => {
    console.log("button clicked")
    
    //select workout list
    if(Number(event.target.getAttribute("id")) !== workoutIndex){
      dispatch({type: "selectWorkout", data: Number(event.target.getAttribute("id"))});
      addExerciseToWorkout(Number(event.target.getAttribute("id")));
    } else {
      console.log("workoutIndex not changed")
      addExerciseToWorkout(workoutIndex);
    }

};

  return (
    <MainWindow>
      <Heading>Select Exercise</Heading>
      {profile && (
        <Container>
          <Grid laptop={laptop} desktop={desktop}>
            {exerciseList.map((exercise, index) => (
              <ExerciseCardStyling
                p="10px 15px"
                justify="space-between"
                key={index}
                hoverMixin
              >
                <Container>
{/* ==== FAVOURITES ==== */}
                  {/* <Container
                    direction="row"
                    justify="space-between"
                    style={{ width: "100%" }}
                  > */}
                    <SmallHeading style={{ fontSize: "1.3rem" }}>
                      {exercise.name}
                    </SmallHeading>
{/* ==== FAVOURITES ==== */}
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
                  sx={{ boxShadow: 0 }}
                >
                  <Typography sx={{ p: 2, width: "280px" }}>
                  {profile.workouts.length === 0 && <p>
                  You don't have a workout list yet. <br/>
                    <Link to="/workouts">Go back</Link> to create a workout list
                  </p>}
                    {profile.workouts && profile.workouts.map((el, i) => (
                      <MenuItem
                        key={i}
                        id={i}
                        onClick={handleAddExercise}
                        sx={{ height: "70px", fontSize: "1.5rem", color: "rgba(20, 20, 20, 0.78)" }}
                      >
                        <AddCircleIcon sx={{ mr: 1 }} /> {el.name}
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


// ***** feature (sprinkle) - Add to Favorite  *********
  // ===== Favourites =====
  // const [selected, setSelected] = useState(false);

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
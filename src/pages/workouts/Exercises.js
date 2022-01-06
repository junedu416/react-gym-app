import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Grid,
  Heading,
  MainWindow,
  SmallHeading,
  StyledAlert,
  Text,
  TextLink,
} from "../../styled-components";
import { ExerciseCardStyling } from "../../styled-components/exercises";
import { useGlobalState } from "../../config/globalStore";
import { getAllExercises } from "../../services/exerciseServices";
import { editProfile } from "../../services/profileServices";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Collapse, IconButton, Menu } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "@mui/material/ToggleButton";
import { Star, StarOutline } from "@mui/icons-material";
import BasicButton from "../../components/buttons/BasicButton";

export const Exercises = () => {
  const [display, setDisplay] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
  // const exerciseCategories = [
  //   "Callisthenics",
  //   "Cardio",
  //   "Fat Burn",
  //   "Free Weights",
  //   "Muscle Gain",
  //   "Tone",
  // ];
  // const muscleGroups = [
  //   "Arms",
  //   "Chest",
  //   "Core",
  //   "Glutes",
  //   "Legs",
  //   "Lower Back",
  //   "Shoulders",
  //   "Upper Back",
  // ];
  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  useEffect(() => {
    getAllExercises().then((exercises) => {
      setExerciseList(exercises);
    });
  }, []);

  const initialValues = {
    sets: null,
    reps: null,
    weight: null,
    distance: null,
    // sets: 0,
    // reps: 0,
    // weight: 0,
    // distance: 0,
  };

  const [newExercise, setNewExercise] = useState(initialValues);
  const [message, setMessage] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [added, setAdded] = useState([]);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/auth/login");
  };

  const containExercise = (obj, list) => {
    var exercise;
    for (exercise in list) {
      if (list.hasOwnProperty(exercise) && list[exercise] === obj) {
        return true;
      }
    }
    return false;
  };

  //this function adds exercise to profile workout array
  const handleAddExercise = async (event, index) => {
    if (added.includes(index)) {
      setAdded(added.filter((sindex) => sindex !== index));
    } else {
      let newAdded = [...added];
      newAdded.push(index);
      setAdded(newAdded);
    }

    setNewExercise({
      ...newExercise,
      _id: exerciseList[index]._id,
      sets: exerciseList[index].defaultSets
        ? exerciseList[index].defaultSets
        : null,
      reps: exerciseList[index].defaultSets
        ? exerciseList[index].defaultSets
        : null,
      weight: exerciseList[index].defaultWeight
        ? exerciseList[index].defaultWeight
        : null,
      distance: exerciseList[index].defaultDistance
        ? exerciseList[index].defaultDistance
        : null,
    });

    const workout = await selectWorkoutList(event);

    if (containExercise(workout.exercises, newExercise)) {
      workout.exercises.push(newExercise);
    } else {
      dispatch({
        type: "setNotification",
        data: "You already have this exercise in your workout",
      });
    }

    editProfile(profile.userId, profile)
      .then((data) => {
        console.log("profile data", data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [workoutListName, setWorkoutListName] = useState("My Workouts");
  const selectWorkoutList = async (event) => {
    setWorkoutListName(event.target.getAttribute("name"));
    console.log("Selected Workout List:", workoutListName);
    const workout = await profile.workouts.find(
      (el) => el.name === workoutListName
    );
    return workout;
  };

  const handleToggle = (selected) => {
    setSelected(!selected);
    if (selected === true) {
      // ====================================================================================
      // NEED BACKEND LOGIC
      // ADD TO FAVOURITES
      // ====================================================================================
    } else {
      // REMOVE FROM FAVOURITES
    }
  };

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
              to view exercises
            </Text>
          </StyledAlert>
        </Collapse>
      )}

      {/* <div>
        Please log in to view exercises{" "}
        <button onClick={navigateToLogin}> Log in</button>
      </div> */}

      <Heading>Select Exercise</Heading>
      {profile && (
        <Container>
          <Grid>
            {exerciseList.map((exercise, index) => (
              <ExerciseCardStyling
                p="10px 15px"
                // align="flex-start"
                justify="space-between"
                key={index}
              >
                <Container>
                  <Container
                    direction="row"
                    justify="space-between"
                    style={{ width: "100%" }}
                  >
                    <SmallHeading style={{ fontSize: "1.3rem" }}>
                      {exercise.name}
                    </SmallHeading>

                    <ToggleButton
                      disableRipple={true}
                      value="check"
                      selected={selected}
                      size="small"
                      style={{ border: "none", background: "none", "&:focus": { border: "none", outline: "none"} }}
                      onChange={() => {
                        handleToggle(selected);
                      }}
                    >
                      {selected ? <Star sx={{ fontSize:"2.5rem" }} /> : <StarOutline sx={{ fontSize:"2.5rem" }} />}
                    </ToggleButton>
                  </Container>

                  <p>{exercise.description}</p>
                </Container>

                {/* <p>
                  {exercise.defaultReps ? exercise.defaultReps : 0} reps,
                  {exercise.defaultSets ? exercise.defaultSets : 0} sets,
                  {exercise.defaultWeight ? exercise.defaultWeight : 0}kg,
                  {exercise.defaultDistance
                    ? exercise.defaultDistance / 1000
                    : 0}
                  km(s)
                </p> */}
                <BasicButton
                  variant="contained"
                  btnFunction={handleClick}
                  text="Add To Workout"
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
                  <Typography sx={{ p: 2, width: "100px" }}>
                    {profile.workouts.map((el, i) => (
                      <li
                        key={i}
                        name={el.name}
                        onClick={(event) => handleAddExercise(event, index)}
                      >
                        {el.name}
                      </li>
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

{
  /* <Container>
  <SmallHeading>Category Type</SmallHeading>
  <Grid>
    {exerciseCategories.map((category) => (
      <ExerciseCardStyling>
        <NavBarLink to="/exercises">{category}</NavBarLink>
      </ExerciseCardStyling>
    ))}
  </Grid>
</Container>
<Container>
  <SmallHeading>Muscle Group</SmallHeading>
  <Grid>
    {muscleGroups.map((muscleGroup) => (
      <ExerciseCardStyling>
        <NavBarLink to="/exercises">{muscleGroup}</NavBarLink>
      </ExerciseCardStyling>
    ))}
  </Grid>
</Container> */
}

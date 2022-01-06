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
import { Collapse, IconButton, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "@mui/material/ToggleButton";
import { Star, StarOutline } from "@mui/icons-material";
import BasicButton from "../../components/buttons/BasicButton";

export const Exercises = () => {
  const [display, setDisplay] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(false);

  const handleBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const { store, dispatch } = useGlobalState();
  const { profile, newExercise } = store;
  console.log(profile)
  

  useEffect(() => {
    getAllExercises().then((exercises) => {
      setExerciseList(exercises);
    });
  }, []);

  // const initialValues = {
  //   _id: null,
  //   sets: null,
  //   reps: null,
  //   weight: null,
  //   distance: null
  // };

  // const [newExercise, setNewExercise] = useState(initialValues);
  const [exerciseList, setExerciseList] = useState([]);
  const [added, setAdded] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(0);

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

  const findWorkoutAddExercise = async (workouts, index, exercise) => {
    workouts[index].exercises.push(exercise)
    return workouts
  }
  
  //this function adds exercise to profile workout array
  const handleAddExercise = async (event, index) => {

    // set workout list index
    setSelectedWorkoutId(event.target.getAttribute("value"))

    if (added.includes(index)) {
      setAdded(added.filter((sindex) => sindex !== index));
    } else {
      let newAdded = [...added];
      newAdded.push(index);
      setAdded(newAdded);
    }

    dispatch ({type: "setNewExercise", data: {
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
    }
    })
    // setNewExercise({
    //   ...newExercise,
    //   _id: exerciseList[index]._id,
    //   sets: exerciseList[index].defaultSets
    //     ? exerciseList[index].defaultSets
    //     : null,
    //   reps: exerciseList[index].defaultSets
    //     ? exerciseList[index].defaultSets
    //     : null,
    //   weight: exerciseList[index].defaultWeight
    //     ? exerciseList[index].defaultWeight
    //     : null,
    //   distance: exerciseList[index].defaultDistance
    //     ? exerciseList[index].defaultDistance
    //     : null,
    // });

    console.log("selected new exercise:", newExercise)
    const workouts = await findWorkoutAddExercise(profile.workouts, selectedWorkoutId, newExercise )
    
    if (containExercise(profile.workouts.exercises, newExercise)) {
      dispatch({type: "addExerciseToProfile", data: workouts});
      dispatch({
        type: "setNotification",
        data: "Add exercise successfully!"
      });
    } else {
      dispatch({
        type: "setNotification",
        data: "You already have this exercise in your workout"
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
                  </Container>

                  <p>{exercise.description}</p>
                </Container>

                <BasicButton
                  variant="contained"
                  btnFunction={handleBtnClick}
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
                        value={i}
                        onClick={(event) => handleAddExercise(event, index)}
                      >
                        {index} {el.name}
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


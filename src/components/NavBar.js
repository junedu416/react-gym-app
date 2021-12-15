import React, { useState } from "react";
import { NavBarLink, Nav } from "../styled-components/navbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Register from "../assets/register-green.png";
import { useGlobalState } from "../config/globalStore";
import { signOutUser } from "../services/userServices";

export const NavBar = (props) => {
  const [search, setSearch] = useState("");
  const {store, dispatch} = useGlobalState();

  function handleInput(event) {
    setSearch(event.target.value);
  }

  function handleSignOut() {
    signOutUser().then(() => {
      dispatch({type: "setProfile", data: null});
      console.log(store);
    })
    
    // dispatch({ type: "removeLoggedInUser" });
    // dispatch({type: "removeJWT"});
  }

  return (
    <Nav>
      <NavBarLink to="/home">
        <HomeIcon fontSize="large" /> Home
      </NavBarLink>
      <NavBarLink to="/workouts">
        <FitnessCenterIcon fontSize="large" /> Workouts
      </NavBarLink>
      <NavBarLink to="/events">
        <EventIcon fontSize="large" /> Events
      </NavBarLink>
      <NavBarLink to="/our-team">
        <GroupsIcon fontSize="large" /> Our Team
      </NavBarLink>
      <NavBarLink to="/contact">
        <ChatBubbleOutlineIcon fontSize="large" /> Contact
      </NavBarLink>
      <NavBarLink to="/home/myprofile">
        <AccountBoxIcon fontSize="large" /> User
      </NavBarLink>
      <NavBarLink to="/auth/login">
        <LoginIcon fontSize="large" /> Sign In
      </NavBarLink>
      <NavBarLink to="/register">
        {/* <HowToRegIcon fontSize="large" /> Sign Up */}
        <img
          src={Register}
          alt="icon to register new account"
          style={{
            width: "26px",
            height: "30px",
            marginBottom: "4px",
            marginTop: "2px",
            
          }}
        />
        Sign Up
      </NavBarLink>
      <NavBarLink onClick={handleSignOut} to="/">
        <LogoutIcon fontSize="large" /> Sign Out
      </NavBarLink>

      <TextField
        placeholder="Search"
        variant="outlined"
        onChange={handleInput}
        value={search}
        style={{ width: "250px", backgroundColor: "rgb(230, 230, 230, 1", borderRadius: "5px" }}
        InputProps={{
          "aria-label": "Search",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {/* <TextField
        placeholder="Search…"
        inputProps={{ "aria-label": "Search" }}
        endAdornment={<SearchIcon />}
        variant="outlined"
        onChange={handleInput}
        value={search}
        style={{ width: "250px", backgroundColor: "rgb(255, 255, 255, 0.5" }}
      /> */}

    </Nav>
  );
};

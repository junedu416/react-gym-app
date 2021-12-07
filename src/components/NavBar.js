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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const NavBar = (props) => {
  const [search, setSearch] = useState("");

  function handleInput(event) {
    setSearch(event.target.value);
  }

  function handleSignOut() {
    // dispatch({ type: "removeLoggedInUser" });
    // dispatch({type: "removeJWT"});
  }

  const iconSize = {
    fontSize: "large",
  }

  return (
    <Nav>
      <NavBarLink to="/home">
        <HomeIcon style={{iconSize}}/> Home
      </NavBarLink>
      <NavBarLink to="/workouts">
        <FitnessCenterIcon /> Workouts
      </NavBarLink>
      <NavBarLink to="/events">
        <EventIcon /> Events
      </NavBarLink>
      <NavBarLink to="/our-team">
        <GroupsIcon /> Our Team
      </NavBarLink>
      <NavBarLink to="/contact">
        <ChatBubbleOutlineIcon /> Contact
      </NavBarLink>
      <NavBarLink to="/my-profile">
        <AccountCircleIcon /> User
      </NavBarLink>
      <NavBarLink to="/auth/login">
        <LoginIcon /> Sign In
      </NavBarLink>
      <NavBarLink to="/register"> Sign Up</NavBarLink>
      <NavBarLink onClick={handleSignOut} to="/">
        <LogoutIcon /> Sign Out
      </NavBarLink>

      <TextField
        variant="outlined"
        onChange={handleInput}
        value={search}
        InputProps={{
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

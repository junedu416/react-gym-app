import React, { useState } from "react";
import { NavBarLink } from "../styled-components/navbar";
import { Nav } from "../styled-components/navbar";
import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const NavBar = (props) => {
  const [search, setSearch] = useState("");

  function handleInput(event) {
    setSearch(event.target.value);
  }

  function handleSignOut() {
    // dispatch({ type: "removeLoggedInUser" });
    // dispatch({type: "removeJWT"});
  }

  return (
    <Nav>
      <NavBarLink to="/home"><HomeIcon /> Home</NavBarLink>
      <NavBarLink to="/workouts"><FitnessCenterIcon /> Workouts</NavBarLink>
      <NavBarLink to="/events"><CalendarTodayIcon /> Events</NavBarLink>
      <NavBarLink to="/our-team"><PeopleAlt /> Our Team</NavBarLink>
      <NavBarLink to="/contact"><ChatBubbleOutlineIcon /> Contact</NavBarLink>
      <NavBarLink to="/my-profile"><PersonIcon /> User</NavBarLink>
      <NavBarLink to="/auth/login"><ExitToAppIcon /> Sign In</NavBarLink>
      <NavBarLink to="/register"> Sign Up</NavBarLink>
      <NavBarLink onClick={handleSignOut} to="/"><ExitToAppIcon /> Sign Out</NavBarLink>

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

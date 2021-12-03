import React, { useState } from "react";
import { NavBarLink } from "../styled-components/navbar";
import { Nav } from "../styled-components/navbar";
import TextField from "@material-ui/core/TextField";
// import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from '@material-ui/icons/Home';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonIcon from '@material-ui/icons/Person';
// import LoginIcon from '@material-ui/icons/Login';
// import LogoutIcon from '@material-ui/icons/Logout';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

import React, { useState } from "react";
import { NavBarLink } from "../styled-components/navbar";
import { Nav } from "../styled-components/navbar";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

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
      <NavBarLink to="/home">Home</NavBarLink>
      <NavBarLink to="/workouts">Workouts</NavBarLink>
      <NavBarLink to="/events">Events</NavBarLink>
      <NavBarLink to="/our-team">Our Team</NavBarLink>
      <NavBarLink to="/contact">Contact</NavBarLink>
      <NavBarLink to="/my-profile">User</NavBarLink>
      <NavBarLink to="/auth/login">Sign In</NavBarLink>
      <NavBarLink to="/register">Sign Up</NavBarLink>
      <NavBarLink onClick={handleSignOut} to="/">
        Sign Out
      </NavBarLink>

      <TextField
        variant="outlined"
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

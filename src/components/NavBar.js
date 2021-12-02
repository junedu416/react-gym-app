import React, { useState } from "react";
import { NavBarLink } from "../styled-components/navbar";
import { Nav } from "../styled-components/navbar";

export const NavBar = (props) => {
  function handleSignOut() {
    // dispatch({ type: "removeLoggedInUser" });
    // dispatch({type: "removeJWT"});
  } 

  return (
    <Nav>
      <NavBarLink to="/home">
        Home
      </NavBarLink>      
      <NavBarLink to="/workouts">
        Workouts
      </NavBarLink>      
      <NavBarLink to="/events">
        Events
      </NavBarLink>      
      <NavBarLink to="/our-team">
        Our Team
      </NavBarLink>      
      <NavBarLink to="/contact">
        Contact
      </NavBarLink>      
      <NavBarLink to="/my-profile">
        User
      </NavBarLink>      
      <NavBarLink to="/auth/login">
        Sign In
      </NavBarLink>      
      <NavBarLink to="/register">
        Sign Up
      </NavBarLink>      
      <NavBarLink onClick={handleSignOut} to="/">
        Sign Out
      </NavBarLink>      
    </Nav>
  );
};

import React, { useState } from "react";
import { NavBarLink, Nav } from "../styled-components/navbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
import { useGlobalState } from "../config/globalStore";
import { signOutUser } from "../services/userServices";
import { RegisterIcon } from "./RegisterIcon.js";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export const NavBar = (props) => {
  const [search, setSearch] = useState("");
  const { store, dispatch } = useGlobalState();
  const [value, setValue] = useState(0);

  const handlePageSelect = (event, newValue) => {
    setValue(newValue);
  };

  function handleInput(event) {
    setSearch(event.target.value);
  }

  function handleSignOut() {
    signOutUser().then(() => {
      dispatch({ type: "setProfile", data: null });
      console.log(store);
    });

    // dispatch({ type: "removeLoggedInUser" });
    // dispatch({type: "removeJWT"});
  }

  return (
    <Nav>
      <Tabs
        value={value}
        onChange={handlePageSelect}
        aria-label="navbar"
        variant="success"
        selectionFollowsFocus
      >
        <LinkTab
          icon={<HomeIcon sx={{ fontSize: "2.5rem" }} />}
          label="Home"
          aria-label="Go to Home page"
          href="/home"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<FitnessCenterIcon sx={{ fontSize: "2.5rem" }} />}
          label="Workouts"
          aria-label="Go to Workouts page"
          href="/workouts"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<EventIcon sx={{ fontSize: "2.5rem" }} />}
          label="Events"
          aria-label="Go to Events page"
          href="/events"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<GroupsIcon sx={{ fontSize: "2.5rem" }} />}
          label="Our Team"
          aria-label="Go to Our Team page"
          href="/our-team"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<ChatBubbleOutlineIcon sx={{ fontSize: "2.5rem" }} />}
          label="Contact"
          aria-label="Go to Contact page"
          href="/contact"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<AccountBoxIcon sx={{ fontSize: "2.5rem" }} />}
          label="User"
          aria-label="Go to My Profile page"
          href="/home/myprofile"
          sx={{ color: "white", fontSize: "small", ml: 70 }}
        />
        <LinkTab
          icon={<LoginIcon sx={{ fontSize: "2.5rem" }} />}
          label="Sign In"
          aria-label="Go to Sign In page"
          href="/auth/login"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<RegisterIcon />}
          label="Sign Up"
          aria-label="Go to Registration page"
          href="/register"
          sx={{ color: "white", fontSize: "small" }}
        />
        <LinkTab
          icon={<LogoutIcon sx={{ fontSize: "2.5rem" }} />}
          label="Sign Out"
          aria-label="Sign Out"
          href="/"
          sx={{ color: "white", fontSize: "small" }}
        />
      </Tabs>

      <TextField
        placeholder="Search"
        variant="outlined"
        onChange={handleInput}
        value={search}
        style={{
          width: "250px",
          backgroundColor: "rgb(230, 230, 230, 1",
          borderRadius: "5px",
          "&:focus": { backgroundColor: "white" },
        }}
        InputProps={{
          "aria-label": "Search",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Nav>
  );
};

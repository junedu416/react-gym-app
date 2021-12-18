
   
import React, { useState } from "react";
import { NavBarLink, Nav } from "../styled-components/navbar";
import { styled } from "@mui/material/styles";
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

import './NavBar.css';
import { useLocation } from "react-router-dom";


// import { matchPath } from "react-router";

const pathname = window.location.pathname;    // => gets the url path without the domain

console.log(pathname);

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }


// ***************** NEED TO UNCOMMENT EITHER line 46 or 71
// Probably need to use global state to keep selection.

// Custom settings and colors for Material-UI tabs

const StyledTabs = styled((props) => (
  <Tabs
    component="a"
    onClick={(event) => {
      // event.preventDefault();
    }}
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "3px",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 70,
    width: "100%",
    backgroundColor: "rgb(57, 255, 20)",
    borderRadius: "10px",
  },
});

const LinkTab = styled((props) => (
  <Tab
    disableRipple
    component="a"
    onClick={(event) => {
      // event.preventDefault();
    }}
    {...props}
  />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(12),
  // fontSize: "0.8rem",
  marginRight: theme.spacing(3),
  color: "rgba(57, 230, 30, 0.85)",
  "&.Mui-selected": {
    color: "rgba(57, 255, 30, 1)",
    fontWeight: theme.typography.fontWeightBold,
    transform: "scale(1.09) translateY(-2px)",
  },
  "&:hover": {
    color: "rgba(57, 255, 45, 1)",
    transform: "scale(1.1) translateY(-2px)",
    transition: "0.2s"
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(57, 255, 45, 0.25)",
  },
}));

 
export const NavBar = (props) => {
  const [search, setSearch] = useState("");
  const { store, dispatch } = useGlobalState();
  
  
  //assigning location variable
  const location = useLocation();
  
  //destructuring pathname from location
  const { pathname } = location;
  
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  
  const [currentUrl, setCurrentUrl] = useState(splitLocation[1]);
  // const [value, setValue] = useState(splitLocation[1]);
  
     console.log(currentUrl);

  const handlePageSelect = (event, newValue) => {
    // setValue(newValue);
    setCurrentUrl(newValue);
    // event.preventDefault();
  };

  function handleInput(event) {
    setSearch(event.target.value);
  }

  function handleSignOut() {
    signOutUser().then(() => {
      dispatch({ type: "setProfile", data: null });
      console.log(store);
    });
  }

  // const { href } = props;

  // const active = (pathname === href) ? true : false;
  // console.log("href: ", href);
  // console.log("Active: ", active);

  const navFontSize = {
    fontSize: "2.5rem",
    // color: active ? "red" : "blue",
  };

  return (
    <Nav>
      <StyledTabs
        value={currentUrl}
        onChange={handlePageSelect}
        aria-label="navbar"
// Parameter makes the selection to auto pick what is focused/selected with the keyboard in navbar
        // selectionFollowsFocus
      >
        <LinkTab
          icon={<HomeIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "home" ? "active" : ""}
          label="Home"
          value="home"
          aria-label="Go to Home page"
          href="/home"
        />
        <LinkTab
          icon={<FitnessCenterIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "workouts" ? "active" : ""}
          label="Workouts"
          value="workouts"
          aria-label="Go to Workouts page"
          href="/workouts"
        />
        <LinkTab
          icon={<EventIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "events" ? "active" : ""}
          label="Events"
          value="events"
          aria-label="Go to Events page"
          href="/events"
        />
        <LinkTab
          icon={<GroupsIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "our-team" ? "active" : ""}
          label="Our Team"
          value="our-team"
          aria-label="Go to Our Team page"
          href="/our-team"
        />
        <LinkTab
          icon={<ChatBubbleOutlineIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "contact" ? "active" : ""}
          label="Contact"
          value="contact"
          aria-label="Go to Contact page"
          href="/contact"
        />
        <LinkTab
          icon={<AccountBoxIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "my-profile" ? "active" : ""}
          label="User"
          value="myprofile"
          aria-label="Go to My Profile page"
          href="/myprofile"
          sx={{ ml: 70 }}
        />
        <LinkTab
          icon={<LoginIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "auth/login" ? "active" : ""}
          label="Sign In"
          value="auth/login"
          aria-label="Go to Sign In page"
          href="/auth/login"
        />
        <LinkTab
          icon={<RegisterIcon />}
          activeClassName="active"
          className={splitLocation[1] === "register" ? "active" : ""}
          label="Sign Up"
          value="register"
          aria-label="Go to Registration page"
          href="/register"
        />
        <LinkTab
          icon={<LogoutIcon sx={ navFontSize } />}
          activeClassName="active"
          className={splitLocation[1] === "" ? "active" : ""}
          label="Sign Out"
          value=""
          aria-label="Sign Out"
          href="/"
        />
      </StyledTabs>

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

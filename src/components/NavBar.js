import React, { useState } from "react";
import { Nav } from "../styled-components/navbar";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalState } from "../config/globalStore";
import { signOutUser } from "../services/userServices";
<<<<<<< HEAD
import { RegisterIcon } from "./RegisterIcon.js";
import { useNavigate } from "react-router-dom";

// ***************** NEED TO UNCOMMENT EITHER event.preventDefault() lines
// Probably need to use global state to keep selection.
=======

import "./NavBar.css";
import { useLocation } from "react-router-dom";

import { navbarData } from "../data/navbarData";

// const pathname = window.location.pathname; // => gets the url path without the domain
// console.log(pathname);
>>>>>>> 21ad59d9acf64eb18c259d8a01f475cb25c23971

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
      event.preventDefault();
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
    transition: "0.2s",
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

  console.log(currentUrl);

  const handlePageSelect = (event, urlPath) => {
    setCurrentUrl(urlPath);
    // event.preventDefault();   // UNCOMMENT TO SEE IT WORKING WITHOUT REFRESH, double click to navigate
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
  // *******************************************************************************************************
  // *******************************************************************************************************
  const [windowDisplay, setWindowDisplay] = useState(); // TODO: use global context to display main window component

  const navFontSize = {
    fontSize: "2.5rem",
  };

  function transformLabel(title) {
    if (title === "our-team") return "Our Team";
    // *******************************************************************************************************
    // **************************** need to change to user's name here once setup ****************************
    else if (title === "profile") return "User";
    else {
      return title[0].toUpperCase() + title.substring(1);
    }
  }

  const navigate = useNavigate();

  return (
    <Nav>
      <StyledTabs
        value={currentUrl}
        onChange={handlePageSelect}
        aria-label="navbar"
        // Parameter makes the selection to auto pick what is focused/selected with the keyboard in navbar
        // selectionFollowsFocus
      >

        {navbarData.map((item, index) => (
          <LinkTab
            icon={item.icon}
            label={transformLabel(item.title)}
            value={item.title}
            aria-label={`Go to ${item.title} page`}
            href={`${item.title === "logout" ? "/" : item.title}`}
            onClick={(event) => {
              setWindowDisplay(item.display);
              // event.preventDefault()
            }}
            sx={index === 5 ? { ml: 70 } : null}
          />
        ))}
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

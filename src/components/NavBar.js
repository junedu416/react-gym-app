import React, { useState } from "react";
import { Nav } from "../styled-components/navbar";
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
// import HowToRegIcon from "@mui/icons-material/HowToReg";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useGlobalState } from "../config/globalStore";
import { signOutUser } from "../services/userServices";
import { RegisterIcon } from "./RegisterIcon.js";
import { useNavigate } from "react-router-dom";

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
  }

  const navTextSize = {
    fontSize: "2.5rem"
  }

  const navigate = useNavigate();

  return (
    <Nav>
      <StyledTabs
        value={value}
        onChange={handlePageSelect}
        aria-label="navbar"
// Parameter makes the selection to auto pick what is focused/selected with the keyboard in navbar
        // selectionFollowsFocus
      >
        <LinkTab
          icon={<HomeIcon sx={ navTextSize } />}
          label="Home"
          aria-label="Go to Home page"
          //href="/home"
          onClick={()=>navigate("/home")}
          value="home"
        />
        <LinkTab
          icon={<FitnessCenterIcon sx={ navTextSize } />}
          label="Workouts"
          aria-label="Go to Workouts page"
          href="/workouts"
          value="Workouts"
        />
        <LinkTab
          icon={<EventIcon sx={ navTextSize } />}
          label="Events"
          aria-label="Go to Events page"
          href="/events"
        />
        <LinkTab
          icon={<GroupsIcon sx={ navTextSize } />}
          label="Our Team"
          aria-label="Go to Our Team page"
          href="/our-team"
        />
        <LinkTab
          icon={<ChatBubbleOutlineIcon sx={ navTextSize } />}
          label="Contact"
          aria-label="Go to Contact page"
          href="/contact"
        />
        <LinkTab
          icon={<AccountBoxIcon sx={ navTextSize } />}
          label="User"
          aria-label="Go to My Profile page"
          href="/home/myprofile"
          sx={{ ml: 70 }}
        />
        <LinkTab
          icon={<LoginIcon sx={ navTextSize } />}
          label="Sign In"
          aria-label="Go to Sign In page"
          href="/auth/login"
        />
        <LinkTab
          icon={<RegisterIcon />}
          label="Sign Up"
          aria-label="Go to Registration page"
          href="/register"
        />
        <LinkTab
          icon={<LogoutIcon sx={ navTextSize } />}
          label="Sign Out"
          aria-label="Sign Out"
          href="/"
          onClick={handleSignOut}
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

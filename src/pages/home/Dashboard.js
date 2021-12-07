import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import { Container, Grid } from "../../styled-components";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CampaignIcon from "@mui/icons-material/Campaign";
import { SidebarData } from "./sidebarData";

// Dashboard Components
import { Overview } from "./Overview";
import { Checkins } from "./Checkins.js";
import { PerformanceStats } from "./PerformanceStats";
import { MyEvents } from "./MyEvents";
import { MyWorkouts } from "./MyWorkouts";
import { MyProfile } from "./MyProfile";
import { Leaderboards } from "./Leaderboards";
import { Contact } from "./Contact";
import { EquipmentReports } from "./Contact";
import { BehaviourReports } from "./Contact";

const drawerWidth = 230;

const Dashboard = () => {
  // const [state, setState] = useState();
  const [dashboardView, setDashboardView] = useState(<Overview />);

  function handleClick(event) {
    event.preventDefault();
  }
  // setDashboardView(component);

  console.log(SidebarData.map((item, index) => item));

  return (
    <Container style={{ flexDirection: "row", border: "3px solid green", marginTop: "80px", }}>
      <CssBaseline />
      {/* <AppBar
          position="absolute"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            mt: "100px",
          }}
        >
          <Container>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                TITLE DISPLAY
              </Typography>
            </Toolbar>
          </Container>
        </AppBar> */}

      <Drawer
        sx={{
          width: drawerWidth,
          height: `calc(100vh - 90px)`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            // marginTop: "80px",
            paddingTop: `calc(100vh / 8)`,
            // position: "sticky",
            position: "fixed",
            zIndex: "1",
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            backgroundColor: "blue",
          },
        }}
        variant="permanent"
      >
        <List>
          {SidebarData.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={handleClick}
              // onClick={displayComponent(item.display, index)}
            >
              <Link
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemIcon
                  style={{ color: "rgba(240, 240, 240, 0.9", minWidth: "35px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* ================ Dashboard content display ================ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          // position: "absolute",
          height: "100vh",
          width: `calc(100vw - ${drawerWidth})`,
        }}
        style={{ border: "4px solid red" }}
      >
        {/* <Toolbar />
        <Toolbar /> */}
        <Overview />
      </Box>
    </Container>
  );
};

export default Dashboard;

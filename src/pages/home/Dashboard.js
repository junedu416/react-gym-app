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
import { SidebarData } from "./sidebarData";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { dashItem } from "../../styled-components/dashboard";
import PropTypes from "prop-types";

import { Overview } from "./Overview";

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
    transition: "0.2s",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(57, 255, 45, 0.25)",
  },
}));

const drawerWidth = "230px";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [dashboardView, setDashboardView] = useState(<Overview />);
  const [value, setValue] = useState(0);

  function handleClick(event) {
    event.preventDefault();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(SidebarData.map((item, index) => item));

  return (
    <Container style={{ flexDirection: "row" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          // height: `calc(100vh - 90px)`,
          height: `100vh`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            paddingTop: `calc(100vh / 8)`,
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
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {SidebarData.map((item, index) => (
            <Tab
              label={item.title}
              style={dashItem}
              onClick={() => {
                setDashboardView(item.display);
              }}
            />
          ))}
        </Tabs>
      </Drawer>

      {/* ================ Dashboard content display ================ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          px: 3,
          height: "100vh",
          width: `calc(100vw - ${drawerWidth})`,
        }}
      >
        {dashboardView}
      </Box>
    </Container>
  );
};

export default Dashboard;

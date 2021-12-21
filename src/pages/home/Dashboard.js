import React, { useState } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import { Container } from "../../styled-components";
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
    left: "0px",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "3px",
  },
  "& .MuiTabs-indicatorSpan": {
    maxHeight: 70,
    minWidth: "7px",
    // backgroundColor: "rgba(253, 106, 2, 1)",
    backgroundColor: "white",
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
  fontSize: theme.typography.pxToRem(14),
  // fontSize: "0.8rem",
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.85)",
  "&:hover": {
    backgroundColor: "rgba(0, 49, 72, 0.70)",
    transition: "0.2s",
  },
  "&.Mui-selected": {
    // color: "rgba(253, 106, 2, 1)",
    color: "white",
    // backgroundColor: "rgba(110, 110, 110, 0.6)",
    backgroundColor: "darkblue",
    fontWeight: theme.typography.fontWeightBold,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 100, 100, 0.4)",
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

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

const Dashboard = () => {
  const [dashboardView, setDashboardView] = useState(<Overview />);
  const [value, setValue] = useState(0);

  // function handleClick(event) {
  //   event.preventDefault();
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <StyledTabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderLeft: 1, borderColor: "divider" }}
        >
          {SidebarData.map((item, index) => (
            <LinkTab
              label={item.title}
              style={dashItem}
              onClick={() => {
                setDashboardView(item.display);
              }}
            />
          ))}
        </StyledTabs>
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

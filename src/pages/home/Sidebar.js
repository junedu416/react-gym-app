import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Container, Heading } from "../../styled-components/";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { dashItem } from "../../styled-components/dashboard";
import PropTypes from "prop-types";
import { useGlobalState } from "../../config/globalStore";
import { signOutUser } from "../../services/userServices";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarData } from "../../data/sidebarData";
import { getBaseRoute } from "../../utils/sidebarUtils";
import { IconButton } from "@mui/material";
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import useMediaQuery from "@mui/material/useMediaQuery";

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
  <Tab disableRipple component="a" {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(14),
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.85)",
  "&:hover": {
    backgroundColor: "rgba(0, 49, 72, 0.70)",
    transition: "0.2s",
  },
  "&.Mui-selected": {
    color: "rgb(170,255,170)",
    // color: "white",
    // backgroundColor: "rgba(110, 110, 110, 0.6)",
    backgroundColor: "darkblue",
    fontWeight: theme.typography.fontWeightBold,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 100, 100, 0.4)",
  },
}));

const drawerWidth = "15%";

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

export const Sidebar = () => {
  // const [dashboardView, setDashboardView] = useState(<Overview />);
  const [value, setValue] = useState(9);
  const { store, dispatch } = useGlobalState();
  const { profile } = store;
  const navigate = useNavigate();
  const [sbData, setSbData] = useState([]);
  const [open, setOpen] = useState(true);

  const fullScreenSidebar = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    console.log("fullScreenSidebar", fullScreenSidebar);
  }, [fullScreenSidebar])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSignOut() {
    signOutUser().then(() => {
      window.localStorage.setItem("uid", null);
      dispatch({ type: "setProfile", data: null });
    });
  }

  const location = useLocation();

  useEffect(() => {
    const baseRoute = getBaseRoute(location.pathname);
    const index = sbData.findIndex((data) => data.route === baseRoute);
    setValue(index);
  }, [location, sbData]);

  useEffect(() => {
    let temp;
    if (profile) {
      temp = SidebarData.filter(
        (e) => e.title[1] !== "Register" && e.title[1] !== "Sign In"
      );
    } else {
      temp = SidebarData.filter(
        (e) =>  e.title[1] === "Sign In" || e.title[1] === "Register"
          // e.title[1] !== "Sign Out" &&
          // e.title[1] !== "Overview" &&
          // e.title[1] !== "Check-ins" &&
          // e.title[1] !== "Performance Stats" &&
          // e.title[1] !== "Events" &&
          // e.title[1] !== "Workouts" &&
          // e.title[1] !== "Profile" &&
          // e.title[1] !== "Leaderboards" &&
          // e.title[1] !== "Reports" &&
          // e.title[1] !== "Our Team"
 
      );
    }
    setSbData(temp);
    console.log("changing sidebardata");
  }, [profile]);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <Container style={{ position: "fixed", flexDirection: "row", zIndex: 1}} w={fullScreenSidebar && !open && "0vw"}>
      {/* <button style={{border: "none", backgroundColor: "rgba(0,0,0,0)"}} onClick={handleOpen}>
          
          <MenuIcon style={{color: open ? "white" : "blue", height: "60px", width: "60px"}}/>
        </button> */}

      {
        <IconButton
          sx={{
            color: open ? "white" : "#555",
            // backgroundColor: open ? "rgba(40, 40, 40, 0.44)" : "rgba(0, 150, 250, 0.8)",
            backgroundColor: open ? "rgba(0, 45, 255, 0.4)" : "rgba(0, 160, 255, 95)",
            transition: "all ease-in 0.3s",
            "&:hover": { color: open ? "white" : "#DDD", backgroundColor: open ? "rgba(45, 45, 45, 0.75)" : "rgba(0, 180, 255, 1)" }
          }}
          style={{
            position: "absolute",
            top: 10,
            left: open ? fullScreenSidebar ? "65%" : "65%" : 15,
            zIndex: 10,
          }}
          aria-label="open menubar"
        >
          {open ? (
            <MultipleStopIcon
              onClick={handleOpen}
              style={{ height: "60px", width: "60px" }}
            />
          ) : (
            <MenuIcon
              onClick={handleOpen}
              style={{ height: "60px", width: "60px" }}
            />
          )}
        </IconButton>
      }

      <CssBaseline />
      <Drawer
        className="drawer"
        open={open}
        sx={{
          width: fullScreenSidebar ? open ? "100vw" : "0vw" : drawerWidth,
          minWidth: fullScreenSidebar ? "0px" : "230px",
          // height: `calc(100vh - 90px)`,
          height: `100vh`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            paddingTop: `calc(100vh / 8)`,
            //position: "fixed",
            zIndex: "1",
            width: fullScreenSidebar ? "100vw" : drawerWidth,
            minWidth: fullScreenSidebar ? "0px" : "230px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            backgroundColor: "blue",
          },
        }}
        variant="persistent"
      >
        <h1
          style={{
            fontFamily: "'Courgette', cursive",
            marginBottom: "2em",
            alignText: "center",
            color: "white",
          }}
        >
          Average Joe's
        </h1>
        <StyledTabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderLeft: 1, borderColor: "divider" }}
        >
          {sbData.map((item, index) => {
            return (
              <LinkTab
                label={item.title}
                style={dashItem}
                key={index}
                onClick={() => {
                  if (item.title[1] === "Sign Out") {
                    handleSignOut();
                  }
                  if (item.route) {
                    navigate(item.route);
                  }
                }}
              />
            );
          })}
        </StyledTabs>
      </Drawer>
    </Container>
  );
};

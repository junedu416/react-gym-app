import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Container } from "../../styled-components/";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { dashItem } from "../../styled-components/dashboard";
import PropTypes from "prop-types";
import { useGlobalState } from "../../config/globalStore";
import { signOutUser } from "../../services/userServices";
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarData } from "../../data/sidebarData";

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

export const Sidebar = () => {
  // const [dashboardView, setDashboardView] = useState(<Overview />);
  const [value, setValue] = useState(9);
  const {store, dispatch} = useGlobalState();
  const {profile} = store;
  const navigate = useNavigate();
  const [sbData, setSbData] = useState([]);
  const [open, setOpen] = useState(true);

  // function handleClick(event) {
  //   event.preventDefault();
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSignOut() {
    signOutUser().then(() => {
      window.localStorage.setItem('uid', null);
      dispatch({ type: "setProfile", data: null });
    });
  }

  const location = useLocation();

  useEffect(() => {
    const index = sbData.findIndex((data) => data.route === location.pathname);
    setValue(index);
  }, [location, sbData])

  useEffect(() => {
    let temp;
    if (profile) {
      temp = SidebarData.filter((e) => e.title[1] !== "Register" && e.title[1] !== "Sign In")
    } else {
      temp = SidebarData.filter((e) => e.title[1] !== "Sign Out")
    }
    setSbData(temp);
    console.log("changing sidebardata");
  }, [profile])

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <Container style={{ position: "fixed",flexDirection: "row" }}>
      <div style={{position: "absolute", top: 0, left: 0, zIndex: 2}}>
        <button style={{border: "none", backgroundColor: "rgba(0,0,0,0)"}} onClick={handleOpen}>
          <MenuIcon style={{color: open ? "white" : "blue", height: "7vh", width: "7vh"}}/>
        </button>
      </div>
      <CssBaseline />
      <Drawer
      open={open}
        sx={{
          width: drawerWidth,
          // height: `calc(100vh - 90px)`,
          height: `100vh`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            paddingTop: `calc(100vh / 8)`,
            //position: "fixed",
            zIndex: "1",
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            backgroundColor: "blue",
          },
        }}
        variant="persistent"
      >
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
          )}
        )}
        </StyledTabs>
      </Drawer>
    </Container>
  );
};

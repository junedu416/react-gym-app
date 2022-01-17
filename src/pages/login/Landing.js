import React from "react";
import { useNavigate } from "react-router";
// import LandingS from "../../assets/LandingS.jpg";
import LandingL from "../../assets/LandingL.jpg";
import BasicButton from "../../components/buttons/BasicButton";
import { Container, Heading } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Landing = (props) => {
  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile } = store;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  function handleClick(event) {
    if (profile) {
      navigate("/overview");
    } else {
      navigate("/auth/login");
    }
  }
  return (
    <>
      <Container
        style={{
          backgroundColor: "black",
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100vh",
        }}
      >
        <img
          src={LandingL}
          alt="muscular fitness model"
          style={{
            height: "100vh",
            position: "fixed",
            bottom: "0px",
            right: "0px",
          }}
        />
      </Container>

      <Container
        w="100%"
        justify="space-evenly"
        align="center"
        bg="rgba(0, 0, 0, 0.4)"
        h= "100%"
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          backdropFilter: "blur(1.5px)",
        }}
      >
        <Heading
          style={{
            fontFamily: "helvetica",
            fontSize: mobile ? "2.3rem" : "5rem",
            color: "white",
            height: "100px",
            width: mobile ? "90%" : "800px",
            textAlign: "center",
            textShadow: "2px 2px 5px black",
          }}
        >
          Take your training to the{" "}
          <strong style={{ color: "red", fontSize: mobile ? "4.5rem" : "7rem" }}>NEXT</strong> level
        </Heading>
        <BasicButton
          text="Get Started"
          variant="outlined"
          sx={{
            fontSize: "1.4rem",
            color: "lime",
            width: "240px",
            mt: 3,
            mb: 0,
            border: "1.7px solid lime",
            borderRadius: "7px",
            opacity: "0.8",
            "&:hover": {
              opacity: "1",
              color: "black",
              backgroundColor: "lime",
              border: "2.5px solid #65FE08",
              boxShadow: "3px 5px 6px -2px rgba(160, 160, 160, 0.6)",
            },
          }}
          style={{height: "75px"}}
          btnFunction={() => {
            handleClick();
          }}
        />
      </Container>
    </>
  );
};

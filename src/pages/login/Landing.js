import React from "react";
import { useNavigate } from "react-router";
import LandingS from "../../assets/LandingS.jpg";
import LandingL from "../../assets/LandingL.jpg";
import Button from "@material-ui/core/Button";

export const Landing = (props) => {
  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/login");
  }
  return (
    <>
      <div
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
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          top: "0px",
          left: "0px",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(1.5px)",
        }}
      >
        <h1
          style={{
            fontFamily: "helvetica",
            fontSize: "5rem",
            color: "white",
            height: "100px",
            width: "800px",
            textAlign: "center",
            textShadow: "2px 2px 5px black",
          }}
        >
          Take your training to the <strong style={{color: "red", fontSize: "7rem"}}>NEXT</strong> level
        </h1>
        <Button variant="outlined" color="primary" size="large"
        onClick={handleClick}
        style={{color: "lime", borderColor: "lime", opacity: "0.8", "&:hover": { opacity: "1"}}}>
          Get Started
        </Button>
      </div>
    </>
  );
};

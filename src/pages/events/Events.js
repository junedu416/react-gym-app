import React from "react";
import { useNavigate } from "react-router";
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import BasicButton from "../../components/buttons/BasicButton";

export const Events = (props) => {
  const navigate = useNavigate();

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
      <MainWindow>
        <Calendar style={{ marginBottom: "50px", padding: "50px" }} />

        <BasicButton
          btnFunction={handleNewEvent}
          text="Create Event"
          style={{ marginTop: "30px" }}
        />
      </MainWindow>
    </>
  );
};

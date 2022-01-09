import React from "react";
import { useNavigate } from "react-router";
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import BasicButton from "../../components/buttons/BasicButton";

export const Events = () => {
  const navigate = useNavigate();

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
      <MainWindow>
        <Calendar />

        <BasicButton
          btnFunction={handleNewEvent}
          text="Create Event"
          sx={{ mt: 4 }}
        />
      </MainWindow>
    </>
  );
};

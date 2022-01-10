import React from "react";
import { useNavigate } from "react-router";
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";

export const Events = () => {
  const navigate = useNavigate();
  const {store} = useGlobalState();
  const {profile} = store;

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
      <MainWindow>
        <Calendar />

        {profile && profile.isStaff && <BasicButton btnFunction={handleNewEvent} text="Create Event" sx={{ mt: 4 }}/>}
        
      </MainWindow>
    </>
  );
};

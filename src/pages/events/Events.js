import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const Events = () => {
  useRedirectUnauthorisedUser();
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

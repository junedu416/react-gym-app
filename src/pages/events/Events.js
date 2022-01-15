import React from "react";
import { useNavigate } from "react-router";
import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const Events = (props) => {
  useRedirectUnauthorisedUser();
  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile } = store;
  const { desktop, phone } = props

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
      <Calendar desktop={desktop} phone={phone} />

      {profile && profile.isStaff && (
        <BasicButton
          btnFunction={handleNewEvent}
          text="Create Event"
          sx={{ mt: 4 }}
        />
      )}
    </>
  );
};

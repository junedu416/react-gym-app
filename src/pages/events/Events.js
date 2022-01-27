import React from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
// import { MainWindow } from "../../styled-components";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");
  const trainerParams = searchParams.get("trainer");
  // const categoryParams = decodeURIComponent(searchParams.get("category"));

  console.log("DECODED category params: ", categoryParams);
  console.log("Trainer params: ", trainerParams);

  function handleNewEvent() {
    navigate("/events/new");
  }

  return (
    <>
      <Calendar desktop={desktop} phone={phone} categoryParams={categoryParams} trainerParams={trainerParams} />

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

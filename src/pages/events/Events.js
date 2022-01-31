import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
// import { MainWindow } from "../../styled-components";
import { Calendar } from "./Calendar";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { getStaffProfiles } from "../../services/profileServices";

export const Events = (props) => {
  useRedirectUnauthorisedUser();
  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile, allevents } = store;
  const { desktop, phone } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");
  const trainerParams = searchParams.get("trainer");

  // const categoryParams = decodeURIComponent(searchParams.get("category"));

  // console.log("DECODED category params: ", categoryParams);
  // console.log("Trainer params: ", trainerParams);

  const [staffProfs, setStaffProfs] = useState([])

  useEffect(() => {
    getStaffProfiles()
    .then(response => {
      console.log("fetched staff profiles:", response)
      setStaffProfs(response)
    }).catch(e => console.log("error:", e))

    // console.log(staffProfs);
  }, [])

  function handleNewEvent() {
    navigate("/events/new");
  }
  
  // console.log("ALL EVENTS AT TOP LEVEL: ========", allevents);

  return (
    <>
      <Calendar
        desktop={desktop}
        phone={phone}
        categoryParams={categoryParams}
        trainerParams={trainerParams}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        staffProfiles={staffProfs}
        profile={profile}
        allevents={allevents}
      />

      {profile?.isStaff && (
        <BasicButton
          btnFunction={handleNewEvent}
          text="Create Event"
          sx={{ mt: 4 }}
        />
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { checkIn, checkOut, getCheckedIn } from "../../services/checkinServices";
import { useGlobalState } from "../../config/globalStore";
import BasicButton from "../../components/buttons/BasicButton";

export const Checkins = () => {

  const {store, dispatch} = useGlobalState();
  const {profile} = store;

  const [checkedIn, setCheckedIn] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getCheckedIn().then(data => {
      //console.log(data);
      if (data) setCheckedIn(data.num)
    });
  }, []);

  function handleCheckIn() {
    if (profile) {
      if (!profile.checkedIn) {
        checkIn({userId: profile.userId}).then((data) => {
          if (data) setCheckedIn(data.num);
          dispatch({type: "toggleCheckIn"});
          setMsg("Checked In");
        });
      } else {
        console.log("Already checked In");
        setMsg("You are already checked in.");
      }
    } else {
      setMsg("You must be logged in first")
      console.log("not logged in");
    }
  }

  function handleCheckOut() {
    if (profile) {
      if (profile.checkedIn) {
        checkOut({userId: profile.userId}).then((data) => {
          if (data) setCheckedIn(data.num);
          dispatch({type: "toggleCheckIn"});
          setMsg("Checked out");
        });
      } else {
        console.log("Already checked out");
        setMsg("You are already checked out.");
      }
    } else {
      setMsg("You must be logged in first.")
      console.log("not logged in");
    }
  }
    
  return (
    <MainWindow>
      <Heading>Check-ins</Heading>
      <Container>
        {msg && <p>{msg}</p>}
        <div>
          <BasicButton style={{marginRight: "5em"}} btnFunction={handleCheckIn} text="Check In" color="primary" size="large">Check In</BasicButton>
          <BasicButton btnFunction={handleCheckOut} text="Check Out" color="primary" size="large">Check Out</BasicButton>
        </div>
        <p>Num checked in: {checkedIn}</p>
      </Container>
    </MainWindow>
  );
};

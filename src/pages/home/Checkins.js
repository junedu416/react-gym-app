import React, { useEffect, useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { checkIn, checkOut, getCheckedIn } from "../../services/checkinServices";
import { useGlobalState } from "../../config/globalStore";

export const Checkins = () => {

  const {store, dispatch} = useGlobalState();
  const {profile} = store;

  const [checkedIn, setCheckedIn] = useState(0);

  useEffect(() => {
    getCheckedIn().then(data => {
      //console.log(data);
      setCheckedIn(data.num)
    });
  }, []);

  function handleCheckIn() {
    if (profile) {
      if (!profile.checkedIn) {
        checkIn({userId: profile.userId}).then((data) => {
          setCheckedIn(data.num);
          dispatch({type: "toggleCheckIn"});
        });
      } else {
        console.log("Already checked In");
      }
    } else {
      console.log("not logged in");
    }
  }

  function handleCheckOut() {
    if (profile) {
      if (profile.checkedIn) {
        checkOut({userId: profile.userId}).then((data) => {
          setCheckedIn(data.num);
          dispatch({type: "toggleCheckIn"});
        });
      } else {
        console.log("Already checked out")
      }
    } else {
      console.log("not logged in");
    }
  }
    
  return (
    <MainWindow>
      <Heading>Check-ins</Heading>
      <Container>
        <button onClick={handleCheckIn}>Check In</button>
        <button onClick={handleCheckOut}>Check Out</button>
        <p>Num checked in: {checkedIn}</p>
      </Container>
    </MainWindow>
  );
};

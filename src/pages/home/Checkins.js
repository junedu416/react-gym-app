import React from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { checkIn, checkOut } from "../../services/checkinServices";
import { useGlobalState } from "../../config/globalStore";

export const Checkins = () => {

  const {store} = useGlobalState();
  const {profile} = store;

  function handleCheckIn() {
    if (profile) {
      if (!profile.checkedIn) {
        checkIn({userId: profile.userId}).then(() => console.log("checked in"));
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
        checkOut({userId: profile.userId}).then(() => console.log("checked out"));
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
      </Container>
    </MainWindow>
  );
};

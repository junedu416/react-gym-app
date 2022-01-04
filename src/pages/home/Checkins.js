import React from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { checkIn, checkOut } from "../../services/checkinServices";

export const Checkins = () => {

  function handleCheckIn() {
    checkIn().then(() => console.log("checked in"));
  }

  function handleCheckOut() {
    checkOut().then(() => console.log("checked out"));
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

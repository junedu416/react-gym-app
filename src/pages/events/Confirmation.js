import React from "react";
import Cancel from "../../components/buttons/Cancel";
import Confirm from "../../components/buttons/Confirm";
import { Container } from "../../styled-components";

export const BookingConfirmation = (props) => {
  
  function handleClick() {
    
  }
  
  return (
    <Container>
      <p>Booking Confirmation Message</p>
      <Container style={{ flexDirection: "row" }}>
        <Confirm btnFunction = {() => {
          handleClick()
        }} />
        <Cancel btnFunction = {() => {
          handleClick()
        }} />
      </Container>
    </Container>
  );
};

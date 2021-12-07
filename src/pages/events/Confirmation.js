import React from "react";
import Cancel from "../../components/buttons/Cancel";
import Confirm from "../../components/buttons/Confirm";
import { Container } from "../../styled-components";

export const BookingConfirmation = (props) => {
  return (
    <Container>
      <p>Booking Confirmation Message</p>
      <Container style={{ flexDirection: "row" }}>
        <Confirm />
        <Cancel />
      </Container>
    </Container>
  );
};

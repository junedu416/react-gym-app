import React from "react";
import { Container } from "../../styled-components";

export const DateDisplay = ({ formatDates }) => {
  const { startDate, startTime, endDate, endTime } = formatDates;
  return (
    <>
      {startDate !== endDate ? (
        <Container>
          <p>
            <b>From: </b>
            {startDate} {startTime}
          </p>
          <p>
            <b>To: </b>
            {endDate} {endTime}
          </p>
        </Container>
      ) : (
        <Container>
          <p>
            <b>Date: </b> {startDate}
          </p>
          <p>
            <b>Time: </b> {startTime} - {endTime}
          </p>
        </Container>
      )}
    </>
  );
};

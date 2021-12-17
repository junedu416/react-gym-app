import React, { useState } from "react";
import Book from "../../components/buttons/Book"
import { Heading, MainWindow } from "../../styled-components";

export const MeetTheTeam = (props) => {
    
  return (
    <MainWindow>
      <Heading>Meet The Team</Heading>
      <Book />
    </MainWindow>
  );
};

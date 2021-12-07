import React, { useState } from "react";
import Info from "../../components/buttons/Info"
import Book from "../../components/buttons/Book"
import { MainWindow } from "../../styled-components";
import { BookingConfirmation } from "./Confirmation";
import { NewEvent } from "./NewEvent";

export const Events = (props) => {
    
  return (
    <>
    <MainWindow>
      <Info />
      <Book />
      <NewEvent />
    </MainWindow>
    <BookingConfirmation />
    </>
  );
};

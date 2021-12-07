import React, { useState } from "react";
import Info from "../../components/buttons/Info"
import Book from "../../components/buttons/Book"
import Confirm from "../../components/buttons/Confirm";
import { MainWindow } from "../../styled-components";

export const Events = (props) => {
    
  return (
    <MainWindow>
      <Info />
      <Book />
      <Confirm />
    </MainWindow>
  );
};

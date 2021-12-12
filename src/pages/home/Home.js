import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { Container, Heading, MainWindow } from "../../styled-components/";

export const Home = (props) => {
    
  return (
    <MainWindow>
      <Dashboard />
    </MainWindow>
  );
};

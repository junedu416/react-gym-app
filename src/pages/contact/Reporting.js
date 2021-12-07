import React, { useState } from "react";
import { ReportUnsocialBehaviour } from "./Behaviour";
import { ReportFaultyEquipment } from "./Equipment";
import { Container, Heading, MainWindow } from "../../styled-components";

export const Reporting = (props) => {
    
  return (
    <MainWindow>
      <Heading>
        Contact
      </Heading>
      <ReportFaultyEquipment />
      <ReportUnsocialBehaviour />
    </MainWindow>
  );
};

import React, { useState } from "react";
import { ReportUnsocialBehaviour } from "./Behaviour";
import { ReportFaultyEquipment } from "./Equipment";
import { MainWindow } from "../../styled-components";

export const Reporting = (props) => {
    
  return (
    <MainWindow>
      <ReportFaultyEquipment />
      <ReportUnsocialBehaviour />
    </MainWindow>
  );
};

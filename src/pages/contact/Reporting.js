import { ReportUnsocialBehaviour } from "./Behaviour";
import { ReportFaultyEquipment } from "./Equipment";

import React, { useState } from "react";

export const Reporting = (props) => {
    
  return (
    <>
      <ReportFaultyEquipment />
      <ReportUnsocialBehaviour />
    </>
  );
};

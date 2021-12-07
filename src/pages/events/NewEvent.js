import React, { useState } from "react";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import CreateEvent from "../../components/buttons/CreateEvent";
import { MainWindow } from "../../styled-components";

export const NewEvent = (props) => {
    
  return (
    <MainWindow>
      <AttachmentIcon />
      <CreateEvent />
    </MainWindow>
  );
};

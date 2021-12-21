import React from "react";
import { UploadButton } from "../../components/buttons/Upload";

import { Container, Heading, MainWindow } from "../../styled-components/";

export const MyProfile = (props) => {
    
  return (
    <MainWindow>
      <Heading>My Profile</Heading>
      <UploadButton />
    </MainWindow>
  );
};

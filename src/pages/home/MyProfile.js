import React from "react";
// import { UploadButton } from "../../components/buttons/Upload";
import { Container, Heading, MainWindow } from "../../styled-components/";
// import DropZone from "../../components/DropZone";

export const MyProfile = (props) => {
  return (
    <MainWindow>
      <Heading>My Profile</Heading>
      <Container>
        <div className="content">
          {/* <DropZone /> */}
        </div>
        {/* <UploadButton /> */}
      </Container>
    </MainWindow>
  );
};

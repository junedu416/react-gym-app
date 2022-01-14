import React from "react";
// import { UploadButton } from "../../components/buttons/Upload";
import { Container, Heading, MainWindow } from "../../styled-components/";
// import DropZone from "../../components/DropZone";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const MyProfile = (props) => {
  useRedirectUnauthorisedUser();
  return (
    <Container>
      <Heading>My Profile</Heading>
    </Container>
  );
};

import React, { useState } from "react";
import { UploadButton } from "../../components/buttons/Upload";

import { Container, Heading } from "../../styled-components/";

export const MyProfile = (props) => {
    
  return (
    <Container style={{
      width: "calc(100vw - 230px)",
      float: "right",
      marginTop: "80px"
    }}>
      <Heading>My Profile</Heading>
      <UploadButton />
    </Container>
  );
};

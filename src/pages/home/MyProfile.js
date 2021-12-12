import React, { useState } from "react";
import { UploadButton } from "../../components/buttons/Upload";

import { Container, Heading } from "../../styled-components/";

export const MyProfile = (props) => {
    
  return (
    <Container>
      <Heading>My Profile</Heading>
      <UploadButton />
    </Container>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import {
  Container,
  Heading,
  MainWindow,
  Text,
  TextBold,
} from "../../styled-components/";
import BasicButton from "../../components/buttons/BasicButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { ProfileImage } from "../../styled-components/profile";
// import DropZone from "../../components/DropZone";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ProfilePicture } from "../../components/ProfilePicture";

export const MyProfile = (props) => {
  useRedirectUnauthorisedUser();
  const { btnFunction } = props;

  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile } = store;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const selectImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  
  

  return (
    <MainWindow>
      <Heading>My Profile</Heading>
      <Container direction={ matches ? "column" : "row" }>
        <div className="content">{/* <DropZone /> */}</div>

        <Container mr="50px" mw="10vw">
          <ProfilePicture profile />
          <BasicButton
            text="Select Photo"
            startIcon={<PhotoCameraIcon/>}
            btnFunction={selectImage}
          />
        </Container>
        <Container align="flex-start" mw="30vw">
          <Container direction="row">
            <TextBold mr="20px">First Name: </TextBold> <Text>{profile.firstName}</Text>
          </Container>
          <Container direction="row">
            <TextBold mr="20px" >Last Name: </TextBold> <Text>{profile.lastName}</Text>
          </Container>
          <Container direction="row">
            <TextBold mr="20px">Email: </TextBold> <Text>{profile.email}</Text>
          </Container>
        </Container>
      </Container>
    </MainWindow>
  );
};

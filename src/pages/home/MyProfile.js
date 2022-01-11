import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import {
  Container,
  Heading,
  MainWindow,
  TextBold,
} from "../../styled-components/";
import BasicButton from "../../components/buttons/BasicButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import DropZone from "../../components/DropZone";

export const MyProfile = (props) => {
  useRedirectUnauthorisedUser();
  const { btnFunction } = props;

  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile } = store;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const selectImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <MainWindow>
      <Heading>My Profile</Heading>
      <Container>
        <div className="content">{/* <DropZone /> */}</div>

        <Container>
          <BasicButton
            text="Upload"
            startIcon={<PhotoCameraIcon />}
            btnFunction={selectImage}
          />
        </Container>
        <Container align="flex-start">
          <Container direction="row">
            <TextBold>First Name: </TextBold> <p>{profile.firstName}</p>
          </Container>
          <Container direction="row">
            <TextBold>Last Name: </TextBold> <p>{profile.lastName}</p>
          </Container>
          <Container direction="row">
            <TextBold>Email: </TextBold> <p>{profile.email}</p>
          </Container>
        </Container>
      </Container>
    </MainWindow>
  );
};

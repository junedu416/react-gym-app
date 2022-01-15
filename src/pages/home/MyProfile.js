import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "../../config/globalStore";
import { editProfile } from "../../services/profileServices";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { Container, Heading, Text, TextBold } from "../../styled-components/";
import { ProfilePicture } from "../../components/ProfilePicture";
import BasicButton from "../../components/buttons/BasicButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const MyProfile = (props) => {
  useRedirectUnauthorisedUser();
  const { btnFunction } = props;

  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile } = store;

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const selectImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const updateProfile = () => {};

  console.log("profile: ", profile);

  return (
    <Container>
      <Heading>My Profile</Heading>
      <Container direction={mobile ? "column" : "row"} align="flex-start">
        <Container
          mr={mobile ? "" : "50px"}
          mw="10vw"
          style={{ alignSelf: mobile ? "center" : "" }}
        >
          <ProfilePicture profile={profile} />
          <BasicButton
            text="Select Photo"
            startIcon={<PhotoCameraIcon />}
            btnFunction={selectImage}
            sx={{ mb: 8 }}
          />
        </Container>
        <Container
          align="flex-start"
          minw={mobile ? "80vw" : "380px"}
          p="15px 30px"
          style={{
            background: "rgba(40, 100, 150, 0.07",
            border: "1px solid rgba(40, 40, 40, 0.02)",
            borderRadius: "20px",
          }}
        >
          <Container direction="row">
            <TextBold mr="20px">First Name: </TextBold>{" "}
            <Text>{profile.firstName}</Text>
          </Container>
          <Container direction="row">
            <TextBold mr="20px">Last Name: </TextBold>{" "}
            <Text>{profile.lastName}</Text>
          </Container>
          <Container direction="row">
            <TextBold mr="60px">Email: </TextBold> <Text>{profile.email}</Text>
          </Container>
          {isFilePicked && (
            <BasicButton
              text="Update"
              btnFunction={updateProfile}
              sx={{ alignSelf: mobile ? "center" : "" }}
            />
          )}

          {/*
           ============ SPRINKLE ============
           Not implementing these functions 
           ============ SPRINKLE ============
           */}
          {/* <Container direction="row">
            <BasicButton text="Change Email" color="info" btnFunction={changeEmail} />
            <BasicButton text="Change Password" color="warning" btnFunction={changePassword} />
          </Container> */}
        </Container>
      </Container>
    </Container>
  );
};

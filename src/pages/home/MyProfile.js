import React, { useState, useRef } from "react";
import { useGlobalState } from "../../config/globalStore";
import { addProfileImage } from "../../services/profileServices";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { Container, Heading, Row, Text, TextBold } from "../../styled-components/";
import { ProfilePicture } from "../../components/ProfilePicture";
import BasicButton from "../../components/buttons/BasicButton";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";
import { ProfileImage } from "../../styled-components/profile";

const Input = styled("input")({
  display: "none",
});

export const MyProfile = () => {
  useRedirectUnauthorisedUser();

  const { store, dispatch } = useGlobalState();
  const { profile } = store;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  function handleImageUpload (e) {
    e.preventDefault();
    setSelectedFile(e.target.files[0])
    uploader(e)
  }

  const updateMyProfile = async (data) => {
    try {
      const result = await addProfileImage(profile.userId, data)
      if(result.data.error) {
        dispatch({type: "setNotification", data: "There was an error updating your image"})
      } else {
        dispatch({type: "setProfile", data: result.data})
        dispatch({type: "setNotification", data: "successfully updated your profile image"})
      }
    } catch (error) {
      console.log("error caught: ", error)
      dispatch({type: "setNotification", data: "There was an error updating your image"})
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append(`photo`, selectedFile)
    updateMyProfile(data)
  }


  function useDisplayImage() {
    const [result, setResult] = useState("");

    function uploader(e) {
      const imageFile = e.target.files[0]; // Need this line in function otherwise doesn't work.
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    }
    // profile.photo = imageRef;

    return { result, uploader };
  }
  console.log("UPDATE PROFILE: ", profile);
  const { result, uploader } = useDisplayImage();

  

  return (
    <Container>
      <Heading>My Profile</Heading>
      <Container direction={mobile ? "column" : "row"} align="flex-start">
        <Container
          mr={mobile ? "" : "50px"}
          mw="10vw"
          style={{ alignSelf: mobile ? "center" : "" }}
        >
          {result ? (
            <ProfileImage
              ref={imageRef}
              src={result}
              alt="selected avatar photo"
            />
          ) : (
            <ProfilePicture profile={profile} />
          )}

          <label htmlFor="select-avatar">
            <Input
              accept="image/*"
              id="select-avatar"
              type="file"
              onChange={handleImageUpload}
            />
            <Button variant="contained" component="span" sx={{ mb: 3 }}>
              Select Photo
            </Button>
          </label>

          {result && (
            <BasicButton
              text="Update"
              btnFunction={handleSubmit}
              sx={{ alignSelf: mobile ? "center" : "" }}
            />
          )}
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
          <Row>
            <TextBold mr="20px">First Name: </TextBold>{" "}
            <Text>{profile.firstName}</Text>
          </Row>
          <Row>
            <TextBold mr="20px">Last Name: </TextBold>{" "}
            <Text>{profile.lastName}</Text>
          </Row>
          <Row>
            <TextBold mr="60px">Email: </TextBold> <Text>{profile.email}</Text>
          </Row>

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

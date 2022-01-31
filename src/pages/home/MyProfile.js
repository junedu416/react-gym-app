import React, { useState, useRef, useEffect } from "react";
import { useGlobalState } from "../../config/globalStore";
import { addProfileImage, editProfile } from "../../services/profileServices";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import {
  Container,
  Heading,
  Row,
  Text,
  TextBold,
} from "../../styled-components/";
import { ProfilePicture } from "../../components/ProfilePicture";
import BasicButton from "../../components/buttons/BasicButton";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { ProfileImage } from "../../styled-components/profile";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoadButton } from "../../components/buttons/LoadButton";

const Input = styled("input")({
  display: "none",
});

export const MyProfile = () => {
  useRedirectUnauthorisedUser();

  const { store, dispatch } = useGlobalState();
  const { profile } = store;
  const theme = useTheme();
  const tablet = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  );
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imageRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // onChange function for form value in description
  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  // onChange function for image value
  function handleImageUpload(e) {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    uploader(e);
  }

  // makes PUT request to add profile.photo
  const updateMyProfile = async (data) => {
    try {
      setLoading(true);
      const result = await addProfileImage(profile.userId, data);
      if (result.data.error) {
        dispatch({
          type: "setNotification",
          data: "There was an error updating your image",
          
        });
        setLoading(false);
      } else {
        dispatch({ type: "setProfile", data: result.data });
        dispatch({
          type: "setNotification",
          data: "successfully updated your profile image",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("error caught: ", error);
      dispatch({
        type: "setNotification",
        data: "There was an error updating your image",
      });
    }
  };

  // onSubmit function to change profile image
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append(`photo`, selectedFile);
    updateMyProfile(data);
  };

  // custom Hook to display image to view before making submission
  function useDisplayImage() {
    const [result, setResult] = useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  // if current user has profile.description set as state
  useEffect(() => {
    if (profile?.description) {
      setDescription(profile.description);
    }
  }, [profile?.description]);

  // opens form input to edit/add desctiprion
  const editDescription = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  }

  // PUT REQ to backend to add profile.description
  const updateStaffDescription = async (data) => {
    try {
      setLoading(true);
      const result = await editProfile(profile.userId, data);
      if (result.data.error) {
        dispatch({
          type: "setNotification",
          data: "There was an error updating your bio description",
        });
        setLoading(false);
      } else {
        dispatch({ type: "setProfile", data: result.data });
        dispatch({
          type: "setNotification",
          data: "Successfully updated your bio description",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("error caught: ", error);
      dispatch({
        type: "setNotification",
        data: "There was an error updating your bio description",
      });
    }
  };

  // onSubmit function to update description in backend
  const handleUpdateDescription = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...profile,
      description: description,
    }
    updateStaffDescription(dataToSend);
    setEditMode(false);
  };

  const buttonUpdateSx = { alignSelf: "center", width: mobile && "100%", ml: "0" }

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
            <LoadButton
              loadPosition="start"
              loading={loading}
              text={loading ? "Updating" : "Update"}
              btnFunction={handleSubmit}
              sx={{ alignSelf: mobile ? "center" : "" }}
            />
          )}
        </Container>
        <Container
          align="flex-start"
          justify="flex-start"
          minw={mobile ? "98vw" : tablet ? "80%" : "500px"}
          mb="50px"
          p="15px 30px"
          style={{
            maxWidth: tablet ? "60%" : "600px",
            // : "600px",
            minHeight: "100%",
            background: "rgba(40, 100, 150, 0.07",
            border: "1px solid rgba(40, 40, 40, 0.02)",
            borderRadius: "20px",
          }}
        >
          <Row>
            <TextBold mr="20px">First Name: </TextBold>
            <Text>{profile?.firstName}</Text>
          </Row>
          <Row>
            <TextBold mr="20px">Last Name: </TextBold>
            <Text>{profile?.lastName}</Text>
          </Row>
          <Row>
            <TextBold mr={mobile ? "10px" : "60px"}>Email: </TextBold> <Text>{profile?.email}</Text>
          </Row>

          {profile?.isStaff && (
            <>
              {!editMode && profile?.description && (
                <Row justify="flex-start" align="flex-start" col>
                  <TextBold style={{  margin: "9px 0 -15px 0", minWidth: "60px" }}>My Bio: </TextBold>
                  <Text style={{ textAlign:"justify", whiteSpace: "pre-line" }}>{profile?.description}</Text>
                </Row>
              )}
              {editMode ? (
                <form onSubmit={handleUpdateDescription}>
                  <TextField
                    label="Description"
                    multiline
                    placeholder="Enter a description or bio about yourself in third person. This will be displayed in Our Teams."
                    minRows={5}
                    maxRows={20}
                    value={description}
                    onChange={handleChange}
                    sx={{ width: mobile ? "100%" : tablet ? "320px" : "480px", mt: 3 }}
                  />
                {description !== profile.description ?
                  <LoadButton
                    text={loading ? "Updating... " : "Update Bio"}
                    loadPosition="start"
                    loading={loading}
                    type="submit"
                    color="warning"
                    sx={ buttonUpdateSx }
                  />
                  :
                  <BasicButton
                    text= "Cancel"
                    color="secondary"
                    btnFunction={cancelEdit}
                    sx={ buttonUpdateSx }
                  />
                }
                </form>
              ) : (
                <BasicButton
                  text={profile?.description ? "Edit Bio" : "Add Description"}
                  btnFunction={editDescription}
                  sx={{ alignSelf: mobile && "center" }}
                />
              )}
            </>
          )}
        </Container>
      </Container>
    </Container>
  );
};

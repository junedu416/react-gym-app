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
import ImageUploading from "react-images-uploading";
// import DropZone from "../../components/DropZone";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProfilePicture } from "../../components/ProfilePicture";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { ErrorText } from "../../styled-components/profile";

import './myprofile.css';

export const MyProfile = (props) => {
  useRedirectUnauthorisedUser();
  const { btnFunction } = props;

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  // const [images, setImages] = useState(null);
  const [images, setImage] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(false);

  const initialProfileData = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    photo: profile.photo,
  };

  const [profileData, setProfileData] = useState(initialProfileData);

  // const handleAvatarChange = (photo) => {
  //   setProfileData({
  //     ...profileData,
  //     [profileData.photo]: images[0],
  //   });
  // };



  const handleUpdateProfile = (event, data) => {
    editProfile(data);

    setLoading(true);
    dispatch({ type: "setProfile", data: profileData });

    dispatch({
      type: "setNotification",
      data: "Profile successfully updated!",
    });
    // Array.from(document.querySelectorAll("input")).forEach(
    //   input => (input.value = "")
    // );
    setLoading(false);
  };

  //   const updateEvent = (data) => {
  //     editEvent(event._id, data).then(result => {
  //         if (result.error){
  //           console.log("error in data validation: ", result.error)
  //           setErrorMessage(result.error);
  //         } else {
  //           console.log("success")
  //           setErrorMessage("");
  //         }
  //       })
  //       .then(() => {
  //           dispatch({type: 'setNotification', data: "Successfully updated event"})
  //           navigate('/events')
  //         })
  //       .catch(error => {
  //         setErrorMessage("Failed to connect to server.")
  //       });
  // }

  return (
    <MainWindow>
      <Heading>My Profile</Heading>
      <Container direction={matches ? "column" : "row"} align="flex-start">
        <div className="content">{/* <DropZone /> */}</div>

        <Container mr="50px" mw="10vw">
          <ProfilePicture profile />

          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
              errors,
            }) => (
              <>
                <div className="upload__image-wrapper">
                  <BasicButton
                    text="Select Photo"
                    btnFunction={onImageUpload}
                    color="info"
                    size="small"
                    startIcon={<PhotoCameraIcon />}
                    style={{ height: "37px" }}
                    // style={isDragging ? { backgroundColor: "red" } : undefined}
                    // {...dragProps}
                  />

                  {imageList > 0}
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      {console.log("image: ", image)}
                      <img src={image["data_url"]} alt="" width="100" />
                      <IconButton
                        onClick={onImageRemove}
                        aria-label="remove-image"
                        style={{
                          position: "absolute",
                          transform: "translate(-20px, -20px)",
                        }}
                      >
                        <CancelIcon
                          fontSize="medium"
                          sx={{
                            color: "grey",
                            background: "white",
                            borderRadius: "100%",
                          }}
                        />
                      </IconButton>
                    </div>
                  ))}
                </div>
                {errors && (
                  <div>
                    {errors.maxNumber && <ErrorText>Max. number of images exceed</ErrorText>}
                    {errors.acceptType && <ErrorText>File type not permitted</ErrorText>}
                    {errors.maxFileSize && <ErrorText>Max. file size exceeded</ErrorText>}
                    {errors.resolution && (
                      <ErrorText>
                        Selected file does not match your desired resolution
                      </ErrorText>
                    )}
                  </div>
                )}
              </>
            )}
          </ImageUploading>
        </Container>
        <Container mw="30vw" align="flex-start">
          <Container direction="row">
            <TextBold mr="20px">First Name: </TextBold>{" "}
            <Text>{profile.firstName}</Text>
          </Container>
          <Container direction="row">
            <TextBold mr="20px">Last Name: </TextBold>{" "}
            <Text>{profile.lastName}</Text>
          </Container>
          <Container direction="row">
            <TextBold mr="60px">Email: </TextBold>{" "}
            <Text>{profile.email ? profile.email : "No email right now"}</Text>
          </Container>

          {/* <BasicButton text="Change Password" btnFunction={handlePasswordChange} /> */}

          {images.length === 1 && (
            <BasicButton
              text="Update"
              color="info"
              // btnFunction={handleUpdateProfile(profileData)}
            />
          )}

        <>
          <div>
            <img for="photo-upload" src={ProfilePicture} />

          </div>
          <input id="photo-upload" type="file" />
          </>
        </Container>
      </Container>
    </MainWindow>
  );
};

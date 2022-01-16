import React from "react";
import { Container, Row, SmallHeading, Text } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore";
import BasicButton from "../../components/buttons/BasicButton";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProfileImage } from "../../styled-components/profile";
import { ProfilePicture } from "../../components/ProfilePicture";

export const StaffCard = (props) => {
  const { store, dispatch } = useGlobalState();
  const { profile } = store;
  const theme = useTheme();
  const tablet = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  );
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container w="450px" h="270px" br=" 10px" greyBorder shadow hoverMixin justify="flex-start">
      <SmallHeading>
        {profile.firstName} {profile.lastName}
      </SmallHeading>
      <Row align="flex-start" justify="flex-start">
      <Container w="35%">
        <ProfilePicture profile={profile} />
      </Container>
      <Container w="65%" p="0 20px" align="flex-start">
        <Text fontSize="0.9rem" m="0" justified> {profile.description}</Text>
      </Container>
</Row>

    </Container>
  );
};

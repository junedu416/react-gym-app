import React from "react";
import { Container, Row, SmallHeading, Text } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore";
import BasicButton from "../../components/buttons/BasicButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProfilePicture } from "../../components/ProfilePicture";

export const StaffCard = (props) => {
  const { store } = useGlobalState();
  const { profile } = store;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  );

  console.log("Profile in Our TEAM: ", profile);
  console.log("props ", props);

  return (
    <Container
      w={mobile ? "95%" : tablet ? "435px" : "400px"}
      h={mobile ? "280px" : "300px"}
      br=" 10px"
      greyBorder
      shadow
      hoverMixin
      justify="flex-start"
      m="0 auto"
      style={{ overflow: "hidden", height: "100%" }}
    >
      <SmallHeading m="5px 0 10px" fs={mobile ? "2.2rem" : "2.5rem"  }>
        {profile.firstName} {profile.lastName}
      </SmallHeading>
      <Row align="flex-start" justify="flex-start">
        <Container w="35%">
          <ProfilePicture
            profile={profile}
            w="120px"
            h="120px"
            mb="5px"
          />
          <BasicButton
            text="Book"
            color="success"
            sx={{ background: "lime", color: "gray" }}
            style={{ minWidth: mobile && "100px", height: "40px" }}
          />
        </Container>
        <Container w="65%" p="0 20px" align="flex-start">
          <Text fontSize={mobile ? "12px" : "14px"} m="0" justified>
            {profile.description}
          </Text>
        </Container>
      </Row>
    </Container>
  );
};

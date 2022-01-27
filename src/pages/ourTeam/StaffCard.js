import React, { useState } from "react";
import { Container, Row, SmallHeading, Text } from "../../styled-components";
import BasicButton from "../../components/buttons/BasicButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProfilePicture } from "../../components/ProfilePicture";
import { useNavigate } from "react-router-dom";
import { getShortenedString } from "../../utils/widgetUtils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const StaffCard = ({ staff }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  );

  const moveToCalendar = (e) => {
    e.preventDefault();
    navigate("/events");
  };

  const toggleDescriptionLength = (e) => {
    e.preventDefault();
    showMore ? setShowMore(false) : setShowMore(true);
  };

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
      <SmallHeading m="5px 0 10px" fs={mobile ? "2.2rem" : "2.5rem"}>
        {staff.firstName} {staff.lastName}
      </SmallHeading>
      <Row align="flex-start" justify="flex-start">
        <Container w="35%">
          <ProfilePicture profile={staff} w="120px" h="120px" mb="5px" />
          <BasicButton
            text="Book"
            color="success"
            sx={{ background: "lime", color: "gray" }}
            style={{ minWidth: mobile && "100px", height: "40px" }}
            btnFunction={moveToCalendar}
          />
        </Container>
        <Container w="65%" p="0 20px" align="flex-start">
          {staff.description && (
            <>
              <Text fontSize={mobile ? "12px" : "14px"} m="0" justified>
                {showMore
                  ? `${staff.description}`
                  : `${getShortenedString(staff.description, 150)}`}
              </Text>
              {staff.description.length >= 150 && (
                <BasicButton
                  text={
                    showMore ? (
                      <>
                        Hide <ExpandLessIcon />
                      </>
                    ) : (
                      <>
                        Show More <ExpandMoreIcon />
                      </>
                    )
                  }
                  variant="text"
                  btnFunction={toggleDescriptionLength}
                  style={{
                    height: "40px",
                    maxWidth: "80px",
                    fontSize: "0.7rem",
                  }}
                />
              )}
            </>
          )}
        </Container>
      </Row>
    </Container>
  );
};

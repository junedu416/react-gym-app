import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Container, Row, Text, TextBold } from "../../styled-components";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BasicButton from "../../components/buttons/BasicButton";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import { ShowPhoto } from "../../styled-components/contact";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ReportStatusIcon } from "./ReportStatusIcon";
import { getStaffProfiles } from "../../services/profileServices";

export const ReportItems = ({
  open,
  report,
  index,
  desktop,
  handleImageBtn,
  handleResolveBtn,
  type,
  unsocialOpen,
}) => {

  const [staffProfiles, setStaffProfiles] = useState([])

  useEffect(() => {
    getStaffProfiles()
    .then(response => {
      console.log("fetched staff profiles:", response)
      setStaffProfiles(response)
    }).catch(e => console.log("error:", e))
  }, [])

  const assignStaffPhoto = (fullname) => {
    const firstName = fullname.split(" ")[0];
    const lastName = fullname.split(" ")[1];
    const resolver = staffProfiles?.filter(staff => staff.firstName === firstName && staff.lastName === lastName)
    return resolver[0]?.photo;
  }

  return (
    <li key={index} style={{ listStyleType: "none" }}>
      <Container
        p="20px"
        m="10px 5px"
        bg="rgba(50, 130, 180, 0.12)"
        hoverMixin
        br="20px"
        align="flex-start"
        justify="flex-start"
        style={{ maxWidth: "98%" }}
      >
        <Row style={{ flexWrap: "wrap", justifyContent:"flex-start" }}>
          <TextBold mr="28px">Reported: </TextBold>
          <p style={{color: "blue"}}>
            <Moment fromNow>{report.reportDate}</Moment>
          </p>
          <Text style={{ marginLeft: "15px", marginRight: "10px" }}>by </Text>
          <TextBold> {report.reporterFullName}</TextBold>
        </Row>
        <Row align="flex-start">
          <TextBold mr="10px">Description: </TextBold>
          <Text style={{ textAlign: "justify", marginTop: "8px", whiteSpace: "pre-line" }}>
            {report.description}
          </Text>
        </Row>
        <Row justify="flex-start" style={{ flexWrap: "wrap" }}>
          <TextBold mr={desktop ? "15px" : "10px"}>Status: </TextBold>
          <ReportStatusIcon resolved={report.resolved} />
        </Row>
        <Row>
          {report.resolvedBy && (
            <>
              <TextBold mr="20px">By: </TextBold>
              <Chip
                variant="outlined"
                label={report.resolvedBy}
                sx={{ color: "white", bgcolor: "#000437" }}
                // avatar={<Avatar src={profile.photo} />}
                avatar={<Avatar src={assignStaffPhoto(report.resolvedBy)} />}
              />
            </>
          )}
        </Row>
        <Row>
          <BasicButton
            text="Photo"
            startIcon={
              open.includes(index) ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            sx={{ mt: 2 }}
            style={{ height: "36px" }}
            btnFunction={() => handleImageBtn(index, type)}
          />

          <BasicButton
            text={report.resolved ? "Unresolved" : " Resolved"}
            startIcon={<WifiProtectedSetupIcon />}
            color="warning"
            sx={{ ml: desktop ? 4 : 1 }}
            style={{ height: "36px" }}
            btnFunction={() => handleResolveBtn(index, type)}
          />
        </Row>

        {/* Doesn't work if these two conditionals are combined with an || to show same component. */}
        {type === "Unsocial Behaviour" && unsocialOpen.includes(index) && (
          <ShowPhoto
            src={report.reportImage}
            alt="user uploaded"
            width="100%"
          />
        )}

        {type === "Faulty Equipment" && open.includes(index) && (
          <ShowPhoto
            src={report.reportImage}
            alt="user uploaded"
            width="100%"
          />
        )}
      </Container>
    </li>
  );
};

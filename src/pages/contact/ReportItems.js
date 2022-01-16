import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Container, Row, Text, TextBold } from "../../styled-components";
import { Button, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";
import BasicButton from "../../components/buttons/BasicButton";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import { ShowPhoto } from "../../styled-components/contact";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const ReportItems = ({
  open,
  report,
  index,
  desktop,
  laptop,
  profile,
  handleImageBtn,
  displayStatus,
  handleResolveBtn,
  type,
  unsocialOpen,
}) => {
  return (
    <li key={index} style={{ listStyleType: "none" }}>
      <Container
        p="20px"
        m="5px"
        // bg="rgba(50, 130, 180, 0.08)"
        bg="rgba(50, 150, 225, 0.5)"
        br="20px"
        align="flex-start"
        justify="flex-start"
        style={{ maxWidth: "98%" }}
        // style={{ background: "rgba(50, 130, 180, 0.16)" }}
        // style={{ background: "rgba(180, 180, 180, 0.1" }}
      >
        {/* <Row>
          <TextBold mr="63px">Type: </TextBold> {report.type}
        </Row> */}
        {/* <Row>
          <TextBold mr="56px">Name: </TextBold> {report.reporterFullName}
        </Row> */}
        <Row>
          <TextBold mr="28px">Reported: </TextBold>
          <u>
            <Moment fromNow>{report.reportDate}</Moment>
          </u>
          <Text style={{ marginLeft: "15px", marginRight: "10px" }}>by </Text>
          <TextBold> {report.reporterFullName}</TextBold>
        </Row>
        <Row align="flex-start">
          <TextBold mr="10px">Description: </TextBold>
          <Text style={{ textAlign: "justify", marginTop: "8px" }}>
            {report.description}
          </Text>
        </Row>
        <Row justify="flex-start" style={{ flexWrap: "wrap" }}>
          <TextBold mr={desktop ? "15px" : "10px"}>Status: </TextBold>
          <Chip
            icon={report.resolved ? <DoneIcon /> : <ReportIcon />}
            color={report.resolved ? "success" : "error"}
            label={displayStatus(report.resolved)}
            variant="filled"
          />
        </Row>
        <Row>
          {report.resolvedBy && (
            <>
              <TextBold mr="20px">By: </TextBold>
              {/* <TextBold mr="78px">By: </TextBold> */}
              <Chip
                variant="outlined"
                label={report.resolvedBy}
                sx={{ color: "white", bgcolor: "#000437" }}
                avatar={<Avatar src={profile.photo} />}
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

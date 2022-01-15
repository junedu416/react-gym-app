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

export const ReportItems = ({
  open,
  report,
  index,
  desktop,
  profile,
  handleImageBtn,
  displayStatus,
  handleResolveBtn,
}) => {
  return (
    <li key={index} style={{ listStyleType: "none" }}>
      <Container
        p="20px"
        m="5px"
        bg="rgba(50, 130, 180, 0.08)"
        br="20px"
        align="flex-start"
        justify="flex-start"
        // style={{ background: "rgba(50, 130, 180, 0.16)" }}
        // style={{ background: "rgba(180, 180, 180, 0.1" }}
      >
        <Row>
          <TextBold mr="63px">Type: </TextBold> {report.type}
        </Row>
        <Row>
          <TextBold mr="56px">Name: </TextBold> {report.reporterFullName}
        </Row>
        <Row>
          <TextBold mr="28px">Reported: </TextBold>
          <Moment fromNow>{report.reportDate}</Moment>
        </Row>
        <Row>
          {/* <Row align="flex-start"> */}
          <TextBold mr="10px">Description: </TextBold>
          <Text style={{ textAlign: "justify" }}>{report.description}</Text>
        </Row>
        <Row justify="flex-start" style={{ flexWrap: "wrap" }}>
          <TextBold mr={desktop ? "50px" : "10px"}>Status: </TextBold>
          <Chip
            icon={report.resolved ? <DoneIcon /> : <ReportIcon />}
            color={report.resolved ? "success" : "error"}
            label={displayStatus(report.resolved)}
            variant="filled"
          />
          <BasicButton
            text={report.resolved ? "Unresolved" : " Resolved"}
            startIcon={<WifiProtectedSetupIcon />}
            color="warning"
            sx={{ my: 0, ml: desktop ? 4 : 2 }}
            style={{ height: "36px", minWidth: desktop && "150px" }}
            btnFunction={() => handleResolveBtn(index)}
          />
        </Row>
        <Row>
          {report.resolvedBy && (
            <>
              <TextBold mr="10px">By: </TextBold>
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
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => handleImageBtn(index)}
        >
          {open.includes(index) ? "Hide Photo" : "Show Photo"}
        </Button>
        {open.includes(index) && (
          <ShowPhoto
            src={report.reportImage}
            alt="user uploaded"
            width={desktop ? "600px" : "100%"}
          />
        )}
      </Container>
    </li>
  );
};

import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import {
  Container,
  Heading,
  HoverBox,
  MainWindow,
  Row,
  Text,
  TextBold,
} from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

import { getAllReports, editReport } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";
import Unresolved from "../../components/Unresolved";
import { Button, Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";
import BasicButton from "../../components/buttons/BasicButton";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";

import useMediaQuery from "@mui/material/useMediaQuery";
import { ShowPhoto } from "../../styled-components/contact";

export const ViewReports = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [reportList, setReportList] = useState([]);
  const [open, setOpen] = useState([]);

  // REMOVE LATER!!
  const desktop = useMediaQuery("(min-width:1400px)");
  const laptop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    const fetchReportsInfo = async () => {
      const reports = await getAllReports();
      for (let report of reports) {
        console.log("report: ", report);
        let reporterProfile = await getUserProfile(report.userId);
        const reporterFullName = reporterProfile
          ? reporterProfile.firstName + " " + reporterProfile.lastName
          : "Unknown User";
        report.reporterFullName = reporterFullName;
      }

      setReportList(reports);
    };

    fetchReportsInfo().catch(console.error);
  }, []);

  const handleImageBtn = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((sindex) => sindex !== index));
    } else {
      let newOpen = [...open];
      newOpen.push(index);
      setOpen(newOpen);
    }
  };

  const [reportValues, setReportValues] = useState({});
  const handleResolveBtn = async (index) => {
    reportList[index].resolved = !reportList[index].resolved;
    if (reportList[index].resolved) {
      reportList[index].resolvedBy = `${profile.firstName} ${profile.lastName}`;
    } else {
      reportList[index].resolvedBy = null;
    }

    setReportValues({
      ...reportList[index],
    });

    const request = await editReport(reportList[index]._id, reportList[index]);
    console.log("REQUEST: ", request);
    return request;
  };

  // console.log("reportValueToSend:", reportValues);

  const totalUnresolved = reportList.filter(
    (report) => !report.resolved
  ).length;
  console.log("Total unresolved: ", totalUnresolved);

  function displayStatus(resolved) {
    if (resolved) return "Resolved";
    else return "Unresolved";
  }

  return (
    <Container>
      <Heading>View Reports</Heading>

      <Container w={desktop ? "30vw" : laptop ? "50vw" : "98vw"}  p={!desktop && "20px"}>
        <Container w="100%">
        <Unresolved text={totalUnresolved} />
        </Container>
        <ul style={{ margin: "0", padding: "0" }}>
          {reportList.map((report, index) => {
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
                    <TextBold mr="56px">Name: </TextBold>{" "}
                    {report.reporterFullName}
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
                        <TextBold mr="78px">By: </TextBold>
                        <Chip
                          variant="outlined"
                          label={report.resolvedBy}
                          sx={{ color: "white", bgcolor: "#000437" }}
                          avatar={<Avatar src={profile.photo} />}
                        />
                      </>
                    )}
                  </Row>
                  <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleImageBtn(index)}>
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
          })}
          <br />
        </ul>
      </Container>
    </Container>
  );
};

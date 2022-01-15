import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import {
  Container,
  Heading,
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
import { ReportBox, ShowPhoto } from "../../styled-components/contact";
import { ReportItems } from "./ReportItems";

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

  // const totalUnresolved = reportList.filter((report) => !report.resolved).length;

  function displayStatus(resolved) {
    if (resolved) return "Resolved";
    else return "Unresolved";
  }

  const equipmentReports = reportList.filter(
    (report) => report.type === "Faulty Equipment"
  );
  const behaviourReports = reportList.filter(
    (report) => report.type === "Unsocial Behaviour"
  );
  // console.log("EQ Reports: ", equipmentReports);
  // console.log("B Reports: ", behaviourReports);

  const totalUnresolvedBehaviour = behaviourReports.filter(
    (report) => !report.resolved
  ).length;
  const totalUnresolvedEquipment = equipmentReports.filter(
    (report) => !report.resolved
  ).length;

  return (
    <Container>
      <Heading>View Reports</Heading>
      <Container p={!desktop && "20px"}>
        <Container
          direction="row"
          w={desktop ? "100%" : laptop ? "50vw" : "98vw"}
        >
          <Container w="45%" mr="50px">
            <Unresolved text={totalUnresolvedBehaviour} />
            <ul style={{ margin: "0", padding: "0", zIndex: "2" }}>
              {/* {reportList.map((report, index) => { */}

              {behaviourReports.map((report, index) => {
                return (
                  <ReportItems
                    open={open}
                    report={report}
                    index={report._id}
                    desktop={desktop}
                    profile={profile}
                    handleImageBtn={handleImageBtn}
                    displayStatus={displayStatus}
                    handleResolveBtn={handleResolveBtn}
                  />
                );
              })}
            </ul>
          </Container>

          <Container
            w="45%"
            p="15px"
            bg="rgba(160, 16, 80, 0.1)"
            style={{
              justifyContent: "flex-start",
              justifyItems: "flex-start",
              height: "100%",
              // position: "relative",
            }}
          >
            <Unresolved text={totalUnresolvedEquipment} />
            <ul
              style={{
                margin: "0",
                padding: "0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                zIndex: "2",
                // position: "absolute",
              }}
            >
              {equipmentReports.map((report, index) => {
                return (
                  <ReportItems
                    open={open}
                    report={report}
                    index={report._id}
                    desktop={desktop}
                    profile={profile}
                    handleImageBtn={handleImageBtn}
                    displayStatus={displayStatus}
                    handleResolveBtn={handleResolveBtn}
                  />
                );
              })}
            </ul>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

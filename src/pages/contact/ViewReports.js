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
  const [unsocialOpen, setUnsocialOpen] = useState([]);

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

  const handleImageBtn = (index, type) => {
    if (type === "Unsocial Behaviour") {
      if (unsocialOpen.includes(index)){
        setUnsocialOpen(unsocialOpen.filter((sindex) => sindex !== index));
      } else {
        let newUnsocialOpen = [...unsocialOpen];
        newUnsocialOpen.push(index);
        setUnsocialOpen(newUnsocialOpen);  
      }
    } 
    else if (type === "Faulty Equipment" ) {
      if (open.includes(index)){
        setOpen(open.filter((sindex) => sindex !== index));
      } else {
        let newOpen = [...open];
        newOpen.push(index);
        setOpen(newOpen);  
      }
    }
    
      // if (open.includes(index)) {
    //   setOpen(open.filter((sindex) => sindex !== index));
    // } else {
    //   let newOpen = [...open];
    //   newOpen.push(index);
    //   setOpen(newOpen);
    // }
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
  // report.type === "Faulty Equipment"
  const equipmentReports = reportList.filter(
    (report, index) => {
      if (report.type === "Faulty Equipment") {
        return {...report, index}
      }
    }
  );
  const behaviourReports = reportList.filter(
    (report) => report.type === "Unsocial Behaviour"
  );
  console.log("EQ Reports: ", equipmentReports);
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

      <Container
        direction={laptop ? "row" : "column"}
        p={!desktop && "20px"}
        w="100%"
        align={laptop ? "flex-start" : "center"}
        justify={laptop ? "center" : "flex-start"}
      >
        <Container
          w={laptop ? "45%" : "90%"}
          mr={laptop ? "40px" : ""}
          p="20px 6px"
          br="20px"
          // bg="rgba(80, 160, 160, 0.1)"
          // bg="#ffcc80"
          bg="rgba(255, 204, 128, 0.2)"
          style={{
            justifyContent: "flex-start",
            justifyItems: "flex-start",
            height: "100%",
          }}
        >
          <Unresolved text={totalUnresolvedBehaviour} type="Unsocial Behaviour" />
          <ul style={{ margin: "0", padding: "0", zIndex: "2" }}>
            {/* {reportList.map((report, index) => { */}

            {behaviourReports.map((report, index) => {
              return (
                <ReportItems
                  open={open}
                  unsocialOpen={unsocialOpen}
                  report={report}
                  index={report._id}
                  laptop={laptop}
                  desktop={desktop}
                  profile={profile}
                  handleImageBtn={handleImageBtn}
                  displayStatus={displayStatus}
                  handleResolveBtn={handleResolveBtn}
                  type="Unsocial Behaviour"
                />
              );
            })}
          </ul>
        </Container>

        <Container
          w={laptop ? "45%" : "90%"}
          p="20px 6px"
          bg="rgba(160, 16, 80, 0.1)"
          br="20px"
          style={{
            justifyContent: "flex-start",
            justifyItems: "flex-start",
            height: "100%",
          }}
        >
          <Unresolved text={totalUnresolvedEquipment} type="Faulty Equipment" />
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
                  laptop={laptop}
                  desktop={desktop}
                  profile={profile}
                  handleImageBtn={handleImageBtn}
                  displayStatus={displayStatus}
                  handleResolveBtn={handleResolveBtn}
                  type="Faulty Equipment"
                />
              );
            })}
          </ul>
        </Container>
      </Container>
    </Container>
  );
};

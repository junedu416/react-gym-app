import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import {
  Container,
  ErrorText,
  Heading,
  HoverBox,
  MainWindow,
  TextBold,
} from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

import { getAllReports, editReport } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";
import Unresolved from "../../components/Unresolved";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";
import BasicButton from "../../components/buttons/BasicButton";

export const ViewReports = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [reportList, setReportList] = useState([]);
  const [open, setOpen] = useState([]);

  const [resolved, setResolved] = useState([]); // Don't need this

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
    // reportList[index].resolvedBy = `${profile.firstName} ${profile.lastName}`;
    // reportList[index].resolvedBy = null;
   
    if (reportList[index].resolved) { 
      reportList[index].resolvedBy = `${profile.firstName} ${profile.lastName}`;
    } else {
      reportList[index].resolvedBy = null;
    }
   
   
    // let newResolved = [...resolved, index];
    // setResolved(newResolved);

    // if (resolved.includes(index)) {
    //   setResolved(resolved.filter((sindex) => sindex !== index));
    // } else {
    //   let newResolved = [...open];
    //   newResolved.push(index);
    //   setResolved(newResolved);
    // }

    setReportValues({
      ...reportList[index],
      // resolved: false,
      // resolvedBy: null,


      // resolvedBy: `${profile.firstName} ${profile.lastName}`,

      // resolved: !!resolved.includes(index),
      // resolvedBy: resolved.includes(index)
    });


    // console.log("reportValue ID: ", reportList[index]._id);
    // console.log("reportValue BEFORE: ", reportList[index]);
    
    const request = await editReport(reportList[index]._id, reportList[index]);
    console.log("REQUEST: ", request);
    return request;
  };

  console.log("reportValueToSend:", reportValues);

  const totalUnresolved = reportList.filter(
    (report) => !report.resolved).length;
  console.log("Total unresolved: ", totalUnresolved);

  function displayStatus(resolved) {
    if (resolved) return "Resolved";
    else return "Unresolved";
  }

  return (
    <MainWindow>
      <Heading>View Reports</Heading>

      <Unresolved text={totalUnresolved} />
      <ul style={{ margin: "0", padding: "0" }}>
        {reportList.map((report, index) => {
          return (
            <li key={index} style={{ listStyleType: "none" }}>
              {/* <HoverBox align="flex-start" justify="flex-start"> */}
              <TextBold mr="63px">Type: </TextBold> {report.type}
              <br />
              <TextBold mr="56px">Name: </TextBold> {report.reporterFullName}
              <br />
              <TextBold mr="28px">Reported: </TextBold>
              <Moment fromNow>{report.reportDate}</Moment>
              <br />
              <TextBold mr="10px">Description: </TextBold> {report.description}
              <br />
              <TextBold mr="50px">Status: </TextBold>
              <Chip
                icon={report.resolved ? <DoneIcon /> : <ReportIcon />}
                color={report.resolved ? "success" : "error"}
                label={displayStatus(report.resolved)}
                variant="filled"
              />
              {/* ====================================================== */}
              {/* {report.resolved === true ? ( */}
                {/* <button
                  style={{ marginLeft: "20px" }}
                  onClick={() => handleResolveBtn(index)}
                >
                {report.resolved ? "Mark As Unresolved" : " Mark As Resolved" }
                </button> */}
                <BasicButton text={report.resolved ? "Mark As Unresolved" : " Mark As Resolved" }
                  color= "warning"
                  sx={{ my: 0, ml: 5, }}
                  style={{ height: "36px" }}
                  btnFunction={() => handleResolveBtn(index)}
                  />
              {/* )} */}
              <br />
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
              <br />
              <button onClick={() => handleImageBtn(index)}>
                {open.includes(index) ? "Hide Photo" : "Show Photo"}
              </button>
              {open.includes(index) && (
                <img src={report.reportImage} alt="user uploaded" />
              )}
              {/* </HoverBox> */}
            </li>
          );
        })}
        <br />
      </ul>
    </MainWindow>
  );
};

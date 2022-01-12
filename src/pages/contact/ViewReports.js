import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import {
  ErrorText,
  Heading,
  MainWindow,
  TextBold,
} from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

import { getAllReports, editReport } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";
import Unresolved from "../../components/Unresolved";
import { Chip } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";

export const ViewReports = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [reportList, setReportList] = useState([]);
  const [open, setOpen] = useState([]);
  const [resolved, setResolved] = useState([]);

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
    if (resolved.includes(index)) {
      setResolved(resolved.filter((sindex) => sindex !== index));
    } else {
      let newResolved = [...open];
      newResolved.push(index);
      // let newResolved = [...resolved, ...index];
      setResolved(newResolved);
    }

    setReportValues({
      ...reportList[index],
      // ...reportList,
      resolved: !!resolved.includes(index),
      resolvedBy: resolved.includes(index)
        ? `${profile.firstName} ${profile.lastName}`
        : null,
    });
    console.log("reportValueToSend:", reportValues);

    const request = await editReport(reportValues._id, reportValues);
    return request;
  };

  const totalUnresolved = reportList.filter(
    (report) => report.resolved === false
  );
  console.log("Total unresolved: ", totalUnresolved);

  function displayStatus(resolved) {
    if (resolved) return "Resolved";
    else return "Unresolved";
  }

  return (
    <MainWindow>
      <Heading>View Reports</Heading>

      <Unresolved text={totalUnresolved.length} />
      <ul style={{ margin: "0", padding: "0" }}>
        {reportList.map((report, index) => {
          return (
            <li key={index} style={{ listStyleType: "none" }}>
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
                icon={
                  report.resolved ? (
                    <DoneIcon style={{ color: "green" }} />
                  ) : (
                    <ReportIcon />
                  )
                }
                color={report.resolved ? "success" : "error"}
                label={displayStatus(report.resolved)}
                variant="filled"
              />
              {resolved.includes(index) && (
                <button onClick={() => handleResolveBtn(index)}>
                  Mark As Resolved
                </button>
              )}
              <br />
              {resolved.includes(index) && (
                <>
                  <TextBold mr="10px">By: </TextBold>
                  <Chip label={report.resolvedBy} variant="outline" avatar={<Avatar src={profile.photo} />} />
                </>
              )}
              <br />
              <button onClick={() => handleImageBtn(index)}>
                {open.includes(index) ? "Hide Photo" : "Show Photo"}
              </button>
              {open.includes(index) && (
                <img src={report.reportImage} alt="user uploaded" />
              )}
            </li>
          );
        })}
        <br />
      </ul>
    </MainWindow>
  );
};

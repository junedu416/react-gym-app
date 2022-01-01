import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Heading, MainWindow } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

import { getAllReports, editReport } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";

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
        let repoterProfile = await getUserProfile(report.userId);
        const reporterFullName = repoterProfile ?
          (repoterProfile.firstName + " " + repoterProfile.lastName):"Unknown User";
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
      setResolved(newResolved);
    }

    setReportValues({
      ...reportList[index],
      resolved: !!resolved.includes(index),
      resolvedBy: resolved.includes(index)
        ? `${profile.firstName} ${profile.lastName}`
        : null,
    });
    console.log("reportValueToSend:", reportValues);

    const request = await editReport(reportValues._id, reportValues);
    return request;
  };

  return (
    <MainWindow>
      <Heading>View Reports</Heading>
      <ul>
        {reportList.map((report, index) => {
          return (
            <li key={index}>
              Type: {report.type}
              <br />
              Reporter Name: {report.reporterFullName}
              <br />
              Report Time: <Moment fromNow>{report.reportDate}</Moment>
              <br />
              Description: {report.description}
              <br />
              <button onClick={() => handleResolveBtn(index)}>
                {resolved.includes(index) ? "Unresolved" : "Issue Resolved"}
              </button>
              {resolved.includes(index) && (
                <p> {report.resolvedBy} </p>
              )}
              <button onClick={() => handleImageBtn(index)}>
                {open.includes(index) ? "Hide Photo" : "Show Photo"}
              </button>
              {open.includes(index) && <img src={report.reportImage} />}
            </li>
          );
        })}
        <br />
      </ul>
    </MainWindow>
  );
};

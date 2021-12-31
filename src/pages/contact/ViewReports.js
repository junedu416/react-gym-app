import React, { useState, useEffect } from "react";
import { Heading, MainWindow } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

import { getAllReports } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";

export const ViewReports = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [reportList, setReportList] = useState();

  useEffect(() => {
    const fetchReportsInfo = async () => {
      const reports = await getAllReports();
      for (let report of reports) {
        let repoterProfile = await getUserProfile(report.userId);
        const reporterFullName =
          repoterProfile.firstName + " " + repoterProfile.lastName;
        report.reporterFullName = reporterFullName;
      }
      setReportList(reports);
    };

    fetchReportsInfo().catch(console.error);
  }, []);

  return (
    <MainWindow>
      {console.log(reportList)}
      <Heading>View Reports</Heading>
      {reportList.map((report) => {
        return (
          <div>
            {report.type}<br/>
            {report.reporterFullName}<br/>
            {report.description}<br/>
            {/* <button>View Photo</button> */}
            <img src= {report.reportImage}/>
          </div>
        );
      })}
    </MainWindow>
  );
};

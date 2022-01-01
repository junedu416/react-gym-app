import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import { Heading, MainWindow } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";

import { getAllReports, editReport } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";

export const ViewReports = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [reportList, setReportList] = useState([]);
  const [open, setOpen] = useState([]);
  const [resolved, setResolved] = useState(false)

//   const initialValues = {
//     type:"",
//     userId:"",
//     description:"",
//     resolved: false,
//     resolvedBy: "",
//     reportDate: null, 
//     reportImage: null
// }
// const [reportValues, setReportValues] = useState(initialValues)

  useEffect(() => {
    const fetchReportsInfo = async () => {
      const reports = await getAllReports();
      console.log(reports)
      for (let report of reports) {
        console.log(report)
        let repoterProfile = await getUserProfile(report.userId);  
        const reporterFullName =
          repoterProfile.firstName + " " + repoterProfile.lastName;
        report.reporterFullName = reporterFullName;
      }
      
      setReportList(reports);
    };

    fetchReportsInfo().catch(console.error);
  },[]);

  

  const handleImageBtn = (id) =>{
    if (open.includes(id)) {
        setOpen(open.filter(sid => sid !== id))
       } else {
        let newOpen = [...open]
        newOpen.push(id)
        setOpen(newOpen)
       }
  }

  const handleResolveBtn = async (id, report) => {
    setResolved(!resolved)
    console.log("resolve:", resolved)
    setReportValues({
        ...reportValues,
        type: report.type,
        userId: report.userId,
        description: report.description,
        resolved: resolved,
        resolvedBy: profile._Id,
        reportDate: report.reportDate, 
        reportImage: report.reportImage
    })

    const request = await editReport(id, reportValues)
    console.log(request)
    
  }

  return (
    <MainWindow>
      {console.log(reportList)}
      <Heading>View Reports</Heading>
      <ul>
      {reportList.map((report, index) => {
        return (
          <li key={index}>
            Type: {report.type}<br/>
            Reporter Name: {report.reporterFullName}<br/>
            Report Time: <Moment fromNow>{report.reportDate}</Moment><br/>
            Description: {report.description}<br/>
            <button onClick={()=>handleResolveBtn(report._id, report)}>{report.resolved? "Unresolved":"Issue Resolved"}</button>
            <button onClick={()=> handleImageBtn(index)}>{open.includes(index) ? "Hide Photo":"Show Photo"}</button>
            {open.includes(index) && <img src= {report.reportImage}/>}
          </li>
        );
      })}
      </ul>
    </MainWindow>
  );
};

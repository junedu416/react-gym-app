import React, { useState, useEffect } from "react";
import { Container, Heading } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";
import { getAllReports, editReport } from "../../services/reportServices.js";
import { getUserProfile } from "../../services/userServices.js";
import Unresolved from "../../components/Unresolved";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReportItems } from "./ReportItems";

export const ViewReports = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const [open, setOpen] = useState([]);
  const [unsocialOpen, setUnsocialOpen] = useState([]);
  const [behaviourReports, setBehaviourReports] = useState([]);
  const [equipmentReports, setEquipmentReports] = useState([]);

  // REMOVE LATER!!
  const desktop = useMediaQuery("(min-width:1400px)");
  const laptop = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    const fetchReportsInfo = async () => {
      const reports = await getAllReports();
      for (let report of reports) {
        let reporterProfile = await getUserProfile(report.userId);
        const reporterFullName = reporterProfile
          ? reporterProfile.firstName + " " + reporterProfile.lastName
          : "Unknown User";
        report.reporterFullName = reporterFullName;
      }

      setEquipmentReports(reports.filter(
        (report) => report.type === "Faulty Equipment"
      ));

      setBehaviourReports(reports.filter(
        (report) => report.type === "Unsocial Behaviour"
      ))
    };

    fetchReportsInfo().catch(console.error);
  }, []);

  const handleImageBtn = (index, type) => {
    console.log("Index: ", index, "       type: ", type);
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
  };
 
  const handleResolveBtn = async (index, type) => {
    if (type === "Unsocial Behaviour") {
      const behaviourClone = [...behaviourReports];
      behaviourClone[index].resolved = !behaviourClone[index].resolved;
      if (behaviourClone[index].resolved) {
        behaviourClone[index].resolvedBy = `${profile.firstName} ${profile.lastName}`;
      } else {
        behaviourClone[index].resolvedBy = null;
      }
      setBehaviourReports(behaviourClone);
    }

    else if (type === "Faulty Equipment") {
      const equipmentClone = [...equipmentReports];
      equipmentClone[index].resolved = !equipmentClone[index].resolved;
      if (equipmentClone[index].resolved) {
        equipmentClone[index].resolvedBy = `${profile.firstName} ${profile.lastName}`;
      } else {
        equipmentClone[index].resolvedBy = null;
      }
      setEquipmentReports(equipmentClone);
    }

    let request;
    if (type === "Faulty Equipment") {
      request = await editReport(equipmentReports[index]._id, equipmentReports[index]);
    } else {
      request = await editReport(behaviourReports[index]._id, behaviourReports[index]);
    }
    return request;
  };

  const totalUnresolvedBehaviour = behaviourReports.filter( report => !report.resolved).length;
  const totalUnresolvedEquipment = equipmentReports.filter( report => !report.resolved).length;

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
          mb="50px"
          br="20px"
          // bg="rgba(80, 160, 160, 0.1)"
          bg="rgba(255, 204, 128, 0.2)"
          greyBorder
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
                  index={index}
                  laptop={laptop}
                  desktop={desktop}
                  profile={profile}
                  handleImageBtn={handleImageBtn}
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
          greyBorder
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
            }}
          >
            {equipmentReports.map((report, index) => {
              return (
                <ReportItems
                  key={index}
                  open={open}
                  report={report}
                  index={index}
                  laptop={laptop}
                  desktop={desktop}
                  profile={profile}
                  handleImageBtn={handleImageBtn}
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

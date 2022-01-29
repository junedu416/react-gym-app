import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../config/globalStore";
import { Widget } from "../styled-components/index";
import { getAllReports } from "../services/reportServices";
import BasicButton from "../components/buttons/BasicButton";
import { sortFromOldestToMostRecent } from "../utils/widget-helpers";
import {
  WidgetTitle,
  WidgetDiv,
  EventParag,
  GreyText,
} from "../styled-components/widgets";
import { getShortenedString } from "../utils/widgetUtils";
import { ReportStatusIcon } from "../pages/contact/ReportStatusIcon";

const ReportWidget = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  //get all reports and filter by if current user created them or all if a staff member is logged in
  useEffect(() => {
    getAllReports().then((data) => {
      let reportsToShow;
      if (profile) {
        if (!profile.isStaff) {
          reportsToShow = data.filter(
            (report) => report.userId === profile.userId
          );
        } else {
          reportsToShow = data;
        }
        reportsToShow = sortFromOldestToMostRecent(reportsToShow, "reportDate");
      }
      setReports(reportsToShow);
    });
  }, [profile]);

  return (
    <Widget>
      <WidgetTitle style={{ padding: 0, margin: "0.5em" }}>
        {profile && profile.isStaff ? "Unresolved Reports" : "Your Reports"}
      </WidgetTitle>
      {reports && reports.length === 0 && (
        <GreyText>There are no reports</GreyText>
      )}
      {reports &&
        reports.map((report, index) => {
          if (index > 1) return <></>;
          return (
            <WidgetDiv centered>
              <EventParag style={{ marginBottom: "12px" }}>
                {getShortenedString(report.description, 50)}
              </EventParag>
              <ReportStatusIcon resolved={report.resolved} />
              {index === 0 && reports.length > 1 && <hr />}
            </WidgetDiv>
          );
        })}
      {profile && (
        <BasicButton
          style={{ marginBottom: "0.1em" }}
          btnFunction={() => navigate("/contact")}
          text={profile.isStaff ? "Resolve" : "New Report"}
        />
      )}
    </Widget>
  );
};

export default ReportWidget;

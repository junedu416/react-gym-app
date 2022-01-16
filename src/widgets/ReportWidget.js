import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../config/globalStore";
import { Widget } from "../styled-components/index";
import { getAllReports } from "../services/reportServices";
import BasicButton from "../components/buttons/BasicButton";
import { sortFromOldestToMostRecent } from "../utils/widget-helpers";
import { WidgetTitle } from "../styled-components/widgets";


const ReportWidget = () => {
    const { store } = useGlobalState();
    const { profile } = store;
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getAllReports().then((data) => {
            let reportsToShow;
            if (profile)
            {
                if (!profile.isStaff) {
                    reportsToShow = data.filter((report) => report.userId === profile.userId);
                } else {
                    reportsToShow = data;
                }
                reportsToShow = sortFromOldestToMostRecent(reportsToShow, "reportDate");
            }
            setReports(reportsToShow);
        });
    }, [profile]);

    function getShortenedString(string) {
        let newString = string.substring(0, 50);
        if (newString.length < string.length) {
            newString = `${newString}...`
        }
        return newString;
    }

    return (
        <Widget>
            <WidgetTitle style={{padding: 0, margin: "0.5em"}}>{profile && profile.isStaff ? "Unresolved Reports" : "Your Reports"}</WidgetTitle>
            {
                reports
                &&
                reports.map((report, index) => {
                    if (index > 1) return;
                    return (
                        <div key={index} style={{ 
                            textAlign: "center",
                            width: "100%", 
                            borderTop: index === 0 ? "0.5px solid black" : "none", 
                            borderBottom: "0.5px solid black", 
                            }}>
                            <p style={{fontSize: "0.75em"}}>{getShortenedString(report.description)}</p>
                            <p style={{fontSize: "0.75em"}}>{report.resolved ? "Resolved" : "Unresolved"}</p>
                        </div>
                    )
                })
            }
            {
                profile
                &&
                <BasicButton 
                    style={{marginBottom: "0.1em"}} 
                    btnFunction={() => navigate("/contact")} 
                    text={profile.isStaff ? "Resolve" : "New Report"} 
                />
            }
            
        </Widget>
    )
}

export default ReportWidget;
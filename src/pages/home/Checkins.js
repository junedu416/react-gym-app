import React, { useEffect, useState } from "react";
import { Container, Heading } from "../../styled-components/";
import {
  checkIn,
  checkOut,
  getCheckedIn,
  getStats,
} from "../../services/checkinServices";
import { useGlobalState } from "../../config/globalStore";
import BasicButton from "../../components/buttons/BasicButton";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ReusableAlert } from "../../components/ReusableAlert";
import { Collapse } from "@mui/material";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";
import { getDataInOrder } from "../../utils/checkInUtils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const Checkins = () => {
  useRedirectUnauthorisedUser();

  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  const [checkedIn, setCheckedIn] = useState(0);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState([]);
  const [open, setOpen] = useState(true);

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const phone = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getCheckedIn().then((data) => {
      if (data) setCheckedIn(data.num);
    });
    getStats().then((data) => {
      if (data) {
        console.log(data);
        const dataInOrder = getDataInOrder(data);
        setChartData(
          Object.values(dataInOrder).map((num) =>
            Math.floor(num / data.weeksActive)
          )
        );
      }
    });
  }, []);

  //Chart setup
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    // responsive: true,
    
      scales: {
        y: {
         grid: {
            // color: "rgba(60, 60, 60, 0.11)",
            color: "transparent",
          },
        },
        x: {
         grid: {
            // color: "rgba(60, 60, 60, 0.14)",
            color: "transparent",
          },
        },
      },
    
  };

  const labels = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  
  const data = {
    labels,
    datasets: [
      {
        hoverBorderColor: "rgb(20, 100, 180)",
        hoverBackgroundColor: "rgb(20, 100, 180)",
        hoverBorderWidth: "0",
        label: "Average Check-ins",
        data: chartData,
        // backgroundColor: "rgba(20, 120, 220, 0.97)",
        // backgroundColor: "rgba(20, 120, 180, 0.2)",
        backgroundColor: "rgba(0, 82, 255, 0.8)",
        borderColor: "rgba(20, 100, 180, 0.92)",
        borderWidth: "2",
        borderRadius: "12",
        // borderColor: "5px solid rgb(40, 140, 250)",
      },
    ],
  };
  //End chart setup

  function handleCheckIn() {
    if (profile) {
      if (!profile.checkedIn) {
        setLoading(true);
        checkIn({ userId: profile.userId })
          .then((data) => {
            if (data) setCheckedIn(data.num);
            dispatch({ type: "toggleCheckIn" });
            setMsg("Checked In");
            setAlertType("success");
            setLoading(false);
          })
          .then(() => {
            getStats().then((data) => {
              console.log(data);
              const dataInOrder = getDataInOrder(data);
              const newData = Object.values(dataInOrder).map((num) =>
                Math.floor(num / data.weeksActive)
              );
              setChartData(newData);
            });
          });
      } else {
        setMsg("You are already checked in.");
        setAlertType("error");
      }
    } else {
      setMsg("You must be logged in first");
      setAlertType("error");
    }
  }

  function handleCheckOut() {
    if (profile) {
      if (profile.checkedIn) {
        setLoading(true);
        checkOut({ userId: profile.userId }).then((data) => {
          if (data) setCheckedIn(data.num);
          dispatch({ type: "toggleCheckIn" });
          setMsg("Checked out");
          setAlertType("success");
          setLoading(false);
        });
      } else {
        setMsg("You are already checked out.");
        setAlertType("error");
      }
    } else {
      setMsg("You must be logged in first.");
      setAlertType("error");
    }
  }

  return (
    <>
      <Heading>Check-ins</Heading>
      <Container>
        {msg && (
          <Collapse in={open}>
            <ReusableAlert
              text={msg}
              severity={alertType}
              open={open}
              btnFunction={() => {
                setOpen(false);
              }}
            />
          </Collapse>
        )}
        <div>
          <BasicButton
            disabled={loading}
            sx={{ mr: 7 }}
            btnFunction={handleCheckIn}
            text="Check In"
          >
            Check In
          </BasicButton>
          <BasicButton
            disabled={loading}
            btnFunction={handleCheckOut}
            text="Check Out"
          >
            Check Out
          </BasicButton>
        </div>
        <p>Num checked in: {checkedIn}</p>
        <Container w={desktop ? "60vw" : "90vw"}>
          <Bar
            options={options}
            data={data}
            style={{ width: "80%", height: "auto" }}
          />
        </Container>
      </Container>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
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

export const Checkins = () => {
  useRedirectUnauthorisedUser();

  const {store, dispatch} = useGlobalState();
  const {profile} = store;

  const [checkedIn, setCheckedIn] = useState(0);
  const [msg, setMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState([]);
  const [open, setOpen] = useState(true);

  const getDataInOrder = (data) => {
    return {
      sun: data.dailyStats.Sunday,
      mon: data.dailyStats.Monday,
      tue: data.dailyStats.Tuesday,
      wed: data.dailyStats.Wednesday,
      thur: data.dailyStats.Thursday,
      fri: data.dailyStats.Friday,
      sat: data.dailyStats.Saturday,
    }
  }

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
    responsive: true,
  };

  const labels = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
  const data = {
    labels,
    datasets: [
      {
        label: "Average Check-ins",
        data: chartData,
        backgroundColor: "blue",
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
        setAlertType("error")
      }
    } else {
      setMsg("You must be logged in first");
      setAlertType("error")
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
          setAlertType("success")
          setLoading(false);
        });
      } else {
        setMsg("You are already checked out.");
        setAlertType("error")
      }
    } else {
      setMsg("You must be logged in first.");
      setAlertType("error")
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
        <Bar options={options} data={data} />
      </Container>
    </>
  );
};

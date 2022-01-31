import React, { useEffect, useState } from "react";
import { Container, Text, Widget } from "../styled-components/";
import {
  checkIn,
  checkOut,
  getCheckedIn,
  getStats,
} from "../services/checkinServices";
import { useGlobalState } from "../config/globalStore";
import BasicButton from "../components/buttons/BasicButton";
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
import { getDataInOrder } from "../utils/checkInUtils";

const CheckInWidget = () => {
  const { store, dispatch } = useGlobalState();
  const { profile } = store;

  const [checkedIn, setCheckedIn] = useState(0);

  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState([]);

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
      }
    }
  }

  function handleCheckOut() {
    if (profile) {
      if (profile.checkedIn) {
        setLoading(true);
        checkOut({ userId: profile.userId }).then((data) => {
          if (data) setCheckedIn(data.num);
          dispatch({ type: "toggleCheckIn" });
          setLoading(false);
        });
      }
    }
  }
  
  const checkinButton = { height: "40px", minWidth: "100px" }

  return (
    <Widget key="Checkin Widget">
      <Container direction="row">
          <BasicButton
            disabled={loading}
            size="small"
            btnFunction={handleCheckIn}
            text="Check In"
            style={ checkinButton }
          />
          <BasicButton
            disabled={loading}
            btnFunction={handleCheckOut}
            text="Check Out"
            size="small"
            style={ checkinButton }
          />
      </Container>
      <Text>Num checked in: {checkedIn}</Text>
      <Bar options={options} data={data} />
    </Widget>
  );
};

export default CheckInWidget;

import React, { useEffect, useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components/";
import { checkIn, checkOut, getCheckedIn, getStats } from "../../services/checkinServices";
import { useGlobalState } from "../../config/globalStore";
import BasicButton from "../../components/buttons/BasicButton";

export const Checkins = () => {

  const {store, dispatch} = useGlobalState();
  const {profile} = store;

  const [checkedIn, setCheckedIn] = useState(0);
  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCheckedIn().then(data => {
      if (data) setCheckedIn(data.num)
    });
    getStats().then(data => {
      if (data) console.log(data);
    });
  }, []);

  function handleCheckIn() {
    if (profile) {
      if (!profile.checkedIn) {
        setLoading(true);
        checkIn({userId: profile.userId}).then((data) => {
          if (data) setCheckedIn(data.num);
          dispatch({type: "toggleCheckIn"});
          setMsg("Checked In");
          setLoading(false);
        });
        getStats().then((data) => {
          console.log(data);
        });
      } else {
        setMsg("You are already checked in.");
      }
    } else {
      setMsg("You must be logged in first")
    }
  }

  function handleCheckOut() {
    if (profile) {
      if (profile.checkedIn) {
        setLoading(true);
        checkOut({userId: profile.userId}).then((data) => {
          if (data) setCheckedIn(data.num);
          dispatch({type: "toggleCheckIn"});
          setMsg("Checked out");
          setLoading(false);
        });
      } else {
        setMsg("You are already checked out.");
      }
    } else {
      setMsg("You must be logged in first.")
    }
  }
    
  return (
    <MainWindow>
      <Heading>Check-ins</Heading>
      <Container>
        {msg && <p>{msg}</p>}
        <div>
          <BasicButton disabled={loading} style={{marginRight: "5em"}} btnFunction={handleCheckIn} text="Check In" color="primary" size="large">Check In</BasicButton>
          <BasicButton disabled={loading} btnFunction={handleCheckOut} text="Check Out" color="primary" size="large">Check Out</BasicButton>
        </div>
        <p>Num checked in: {checkedIn}</p>
      </Container>
    </MainWindow>
  );
};

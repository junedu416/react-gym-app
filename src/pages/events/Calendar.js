import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";

export const Calendar = () => {
  const [eventSelect, setEventSelect] = useState("class");

  const handleEventSelect = (event, newEventSelect) => {
    if(!newEventSelect) setEventSelect("class");
    else {
      setEventSelect(newEventSelect);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        value={eventSelect}
        exclusive
        onChange={handleEventSelect}
        aria-label="calendar event display toggle selection"
        size="large"
        color="warning"
        style={{backgroundColor: "lightBlue", margin:"50px"}}
      >
        <ToggleButton value="class" aria-label="class" sx={{color:"grey"}}>
          Classes
        </ToggleButton>
        <ToggleButton value="competition" aria-label="competition" sx={{color:"grey"}}>
          Competitions
        </ToggleButton>
        <ToggleButton value="personal training" aria-label="personal training" sx={{color:"grey"}}>
          Personal Training
        </ToggleButton>
      </ToggleButtonGroup>
      <CalendarView eventCategory={eventSelect}/>

    </>
  );
};

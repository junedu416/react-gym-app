import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const Calendar = () => {
  const [eventSelect, setEventSelect] = useState("classes");

  const handleEventSelect = (event, newEventSelect) => {
    if (newEventSelect !== null) {
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
        <ToggleButton value="classes" aria-label="classes" sx={{color:"grey"}}>
          Classes
        </ToggleButton>
        <ToggleButton value="competitions" aria-label="competitions" sx={{color:"grey"}}>
          Competitions
        </ToggleButton>
        <ToggleButton value="socials" aria-label="socials" sx={{color:"grey"}}>
          Socials
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

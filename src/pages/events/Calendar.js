import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarView from "../../components/CalendarView";
import { Container } from "../../styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { FilterBox } from "../../styled-components/events";
import { gymClasse, weekdays, trainers } from "../../data/events"
import DoneIcon from '@mui/icons-material/Done';

export const Calendar = () => {
  const [eventSelect, setEventSelect] = useState("class");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleEventSelect = (event, newEventSelect) => {
    if (!newEventSelect) setEventSelect("class");
    else {
      setEventSelect(newEventSelect);
    }
  };

  return (
    <>
      <Container direction="row" w="100%" justify="space-between">
        <Container direction="row" w="35%" justify="flex-start">
          <Container direction="row" ml="70px" mr="20px">
            <FilterAltIcon sx={{ mr: "5px" }} />
            Filters
          </Container>
          <Container
            direction="row"
            w="100%"
            justify="flex-start"
            style={{ gap: "20px" }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <Container direction="row" style={{ position: "relative", gap: "30px" }}>
                <Chip label="Class" color={open ? "primary" : "default"}  variant="outlined" onClick={handleClick} />
                {/* {open ? <FilterBox sx={{ pl: "20px"}}>
                  {gymClasses.map((item, index) => {
                    return (
                    <Container align="center" justify="space-between" direction="row" >
                     <p><strong>{item.name}</strong></p>
                        <DoneIcon color="success" />
                    </Container>
                  )})}
                </FilterBox> : null} */}
                <Chip label="Day" color={open ? "primary" : "default"} variant="outlined" onClick={handleClick} />
                {/* {open ? <FilterBox>
                  {weekdays.map((day, index) => {
                    return (
                    <Container align="center" justify="space-between" direction="row" >
                     <p><strong>{day}</strong></p>
                        <DoneIcon color="success" />
                    </Container>
                  )})}
                </FilterBox> : null} */}
                <Chip label="Trainer" color={open ? "primary" : "default"} variant="outlined" onClick={handleClick} />
                {open ? <FilterBox>
                  {trainers.map((trainer, index) => {
                    return (
                    <Container align="center" justify="space-between" direction="row" >
                     <p><strong>{trainer}</strong></p>
                        <DoneIcon color="success" />
                    </Container>
                  )})}
                </FilterBox> : null}
              </Container>
            </ClickAwayListener>
          </Container>
        </Container>
        <Container w="30%">
          <ToggleButtonGroup
            value={eventSelect}
            exclusive
            onChange={handleEventSelect}
            aria-label="calendar event display toggle selection"
            size="medium"
            color="warning"
            style={{ backgroundColor: "lightBlue", margin: "15px" }}
          >
            <ToggleButton
              value="class"
              aria-label="class"
              sx={{ color: "grey" }}
            >
              Classes
            </ToggleButton>
            <ToggleButton
              value="competition"
              aria-label="competition"
              sx={{ color: "grey" }}
            >
              Competitions
            </ToggleButton>
            <ToggleButton
              value="personal training"
              aria-label="personal training"
              sx={{ color: "grey" }}
            >
              Personal Training
            </ToggleButton>
          </ToggleButtonGroup>
        </Container>
        <Container w="35%">
          <span></span>
        </Container>
      </Container>
      <CalendarView eventCategory={eventSelect} />
    </>
  );
};

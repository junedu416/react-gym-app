import React, { useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import CreateEvent from "../../components/buttons/CreateEvent";
import {MenuItem, TextField, Stack} from "@mui/material";
// Date/Time Selection
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {MobileDatePicker, MobileTimePicker} from "@mui/lab";


export const NewEvent = (props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const initialValues = {
    name: '',
    description: '',
    category: '',
    spotsAvailable: 0
  }
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted")
    const infoToSend = {
      ...formValues,
      startTime: startTime,
      endTime: endTime
    }
    console.log(infoToSend);
  }

  return (
    <MainWindow>
      <Heading>Create Event</Heading>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Event Name"
          variant="outlined"
          sx={{ minWidth: 480, mb: 3 }}
          name="name"
          onChange={handleChange}
          required
        />
  
        <TextField
          id="outlined-select-event-type"
          select
          label="Event Type"
          value={formValues.category}
          onChange={handleChange}
          name="category"
          required
          helperText="Please select the event type">
            <MenuItem key="class" value="Class">Class</MenuItem>
            <MenuItem key="competition" value="Competition">Competition</MenuItem>
            <MenuItem key="personal training" value="Personal Training">Personal Training</MenuItem>
        </TextField>


        {/* Date Selection */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container style={{flexDirection: "row"}}>

            <Stack spacing={2} mr={2} my={4}>
              <MobileDatePicker
                label="Start Date"
                value={startTime}
                onChange={(newValue) => {setStartTime(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
              <MobileDatePicker
                label="End Date"
                value={endTime}
                onChange={(newValue) => {setEndTime(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
            </Stack>

            <Stack spacing={2}>
              <MobileTimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => {setStartTime(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
              <MobileTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => {setEndTime(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
            </Stack>
        </Container>
      </LocalizationProvider>

      <TextField
          id="outlined-multiline-flexible"
          label="Your Message"
          multiline
          rows={4}
          maxRows={4}
          value={formValues.description}
          name="description"
          onChange={handleChange}
          sx={{ minWidth: 480 }}
          required/>
      
      <TextField 
        id="outlined-basic"
        variant="outlined"
        label="Spots Available"
        type="number" 
        name="spotsAvailable"
        inputProps={{ min: "1", step: "1" }} 
        required
        onChange={handleChange}
        value={formValues.spotsAvailable}
        defaultValue="1"
        />


      <AttachmentIcon /> <span>Attach Photo</span>
        <CreateEvent />
      </form>
    </MainWindow>
  );
};

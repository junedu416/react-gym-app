import React, { useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import CreateEvent from "../../components/buttons/CreateEvent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Input } from '@mui/material';

// Date Selection
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

// Time Selection
import MobileTimePicker from "@mui/lab/MobileTimePicker";


export const NewEvent = (props) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  // const [time, setTime] = useState(new Date("2021-12-08T00:00:00.000Z"));

  const initialValues = {
    name: '',
    description: '',
    category: '',
    spotsAvailable: 0
  }
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (event) => {
    // setEventType(event.target.value);
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
      start: start,
      end: end
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
            <MenuItem key="class" value="class">Class</MenuItem>
            <MenuItem key="competition" value="competition">Competition</MenuItem>
            <MenuItem key="personal training" value="personal training">Personal Training</MenuItem>
        </TextField>


        {/* Date Selection */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container style={{flexDirection: "row"}}>

            <Stack spacing={2} mr={2} my={4}>
              <MobileDatePicker
                label="Start Date"
                value={start}
                onChange={(newValue) => {setStart(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
              <MobileDatePicker
                label="End Date"
                value={end}
                onChange={(newValue) => {setEnd(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
            </Stack>

            <Stack spacing={2}>
              <MobileTimePicker
                label="Start Time"
                value={start}
                onChange={(newValue) => {setStart(newValue);}}
                renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}/>
              <MobileTimePicker
                label="End Time"
                value={end}
                onChange={(newValue) => {setEnd(newValue);}}
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
      
      {/* <InputLabel for="spotsAvailable">Spots Available</InputLabel> */}
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

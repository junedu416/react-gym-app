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

// Date Selection
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

// Time Selection
import TimePicker from "@mui/lab/TimePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";

export const NewEvent = (props) => {
  const [eventType, setEventType] = useState('');
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(new Date("2021-12-08T00:00:00.000Z"));
  const [message, setMessage] = useState('');

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

  const handleTyping = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted")
    console.log(formValues, value)
  }

  return (
    <MainWindow>
      <Heading>Create Event</Heading>
      <form onSubmit={handleSubmit}>
      <FormControl required sx={{ m: 1, minWidth: 480 }} >
      <TextField
        id="outlined-basic"
        label="Event Name"
        variant="outlined"
        sx={{ minWidth: 480, mb: 3 }}
        name="name"
        onChange={handleChange}
      />
      {/* <FormControl required sx={{ m: 1, minWidth: 480 }}> */}
        <InputLabel id="demo-simple-select-required-label">
          Event Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          // value={eventType}
          value={formValues.category}
          label="Event Type"
          onChange={handleChange}
          name="category"
        >
          <MenuItem value="class">Class</MenuItem>
          <MenuItem value="competition">Competition</MenuItem>
          {/* <MenuItem value="social">Social</MenuItem> */}
        </Select>
        <FormHelperText>Required *</FormHelperText>
      </FormControl>

      {/* Date Selection */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container style={{flexDirection: "row"}}>

        <Stack spacing={2} mr={2} my={4}>
          <MobileDatePicker
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}
          />
          {/* <DatePicker
            disableFuture
            label="Responsive"
            openTo="year"
            views={["year", "month", "day"]}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            // value={formValues.startTime}
            // name="startTime"
            // onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </Stack>

        <Stack spacing={2}>
          <MobileTimePicker
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField style={{marginBottom: "20px"}} {...params} />}
          />
          {/* <DesktopTimePicker
            label="For desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          /> */}
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
          // onChange={handleTyping}
          onChange={handleChange}
          sx={{ minWidth: 480 }}
        />

      <AttachmentIcon /> <span>Attach Photo</span>
        <CreateEvent />
      {/* </FormControl> */}
      </form>
    </MainWindow>
  );
};

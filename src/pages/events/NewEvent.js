import React, { useState } from "react";
import { Heading, MainWindow } from "../../styled-components";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import CreateEvent from "../../components/buttons/CreateEvent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Date Selection
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";

export const NewEvent = (props) => {
  const [eventType, setEventType] = useState("");
  const [value, setValue] = useState(new Date());

  const handleChange = (event) => {
    setEventType(event.target.value);
  };

  return (
    <MainWindow>
      <Heading>Create Event</Heading>
      <TextField
        id="outlined-basic"
        label="Event Name"
        variant="outlined"
        sx={{ minWidth: 300 }}
      />
      <FormControl required sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-required-label">
          Event Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={eventType}
          label="Event Type"
          onChange={handleChange}
        >
          <MenuItem value="class">Class</MenuItem>
          <MenuItem value="competition">Competition</MenuItem>
          <MenuItem value="social">Social</MenuItem>
        </Select>
        <FormHelperText>Required *</FormHelperText>
      </FormControl>

      {/* Date Selection */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            disableFuture
            label="Responsive"
            openTo="year"
            views={["year", "month", "day"]}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <AttachmentIcon />
      <CreateEvent />
    </MainWindow>
  );
};

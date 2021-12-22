import React, { useState } from "react";
import { Container, Heading, MainWindow } from "../../styled-components";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import CreateEvent from "../../components/buttons/CreateEvent";
import { MenuItem, TextField, Stack } from "@mui/material";
// Date/Time Selection
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDatePicker, MobileTimePicker } from "@mui/lab";
// services
import { createNewEvent } from "../../services/eventsServices";
import Select from "@mui/material/Select";

export const NewEvent = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [image, setImage] = useState(null);

  const initialValues = {
    name: "",
    description: "",
    category: "",
    level: "",
    spotsAvailable: 1,
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    const infoToSend = {
      ...formValues,
      startTime: startTime,
      endTime: endTime,
      eventImage: image,
    };
    const data = new FormData();
    for (let key in infoToSend) {
      data.append(`${key}`, infoToSend[key]);
    }
    // post to event
    createNewEvent(data);
  };

  const handleFile = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const alignLeft = {
    alignSelf: "flex-start",
    marginBottom: "20px",
  };

  const gymClasses = [
    {
      name: "BodyAttack",
      description: "abc",
    },
    {
      name: "BodyCombat",
      description: "",
    },
    {
      name: "BodyPump",
      description: "",
    },
    {
      name: "Bootcamp",
      description: "",
    },
    {
      name: "Boxing",
      description: "",
    },
    {
      name: "Circuit",
      description: "",
    },
    {
      name: "Cycle",
      description: "",
    },
    {
      name: "HIIT",
      description: "",
    },
    {
      name: "Pilates",
      description: "",
    },
    {
      name: "Yoga",
      description: "",
    },
    {
      name: "Zumba",
      description: "",
    },
  ];

  // const gymClasses = ["A", "b", "c"];
  const eventCategories = ["Class", "Competition", "Personal Training"];

  return (
    <MainWindow>
      <Heading>Create Event</Heading>
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            select
            label="Event Type"
            required
            value={formValues.category}
            onChange={handleChange}
            name="category"
            helperText="Please select the event type"
            sx={{ mb: 3 }}
            fullWidth
          >
            {eventCategories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </TextField>

          {formValues.category === "Class" ? (
            <TextField
              select
              required
              label="Select Class"
              value={formValues.name}
              onChange={handleChange}
              name="name"
              helperText="Please select class"
              fullWidth
            >
              {gymClasses.map((groupClass) => (
                <MenuItem value={groupClass.name}>{groupClass.name}</MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              required
              label="Event Name"
              variant="outlined"
              fullWidth
              // sx={{ minWidth: 480, mb: 3 }}
              name="name"
              onChange={handleChange}
            />
          )}

          {/* Date Selection */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container style={{ flexDirection: "row" }}>
              <Stack spacing={2} mr={2} my={4}>
                <MobileDatePicker
                  label="Start Date"
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mb: 2 }} {...params} />
                  )}
                />
                <MobileDatePicker
                  label="End Date"
                  value={endTime}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mb: 2 }} {...params} />
                  )}
                />
              </Stack>

              <Stack spacing={2}>
                <MobileTimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mb: 2 }} {...params} />
                  )}
                />
                <MobileTimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ mb: 2 }} {...params} />
                  )}
                />
              </Stack>
            </Container>
          </LocalizationProvider>

          {formValues.category === "Competition" ? null : (
            <TextField
              required
              variant="outlined"
              label="Spots Available"
              type="number"
              name="spotsAvailable"
              inputProps={{ min: "1", step: "1" }}
              onChange={handleChange}
              value={formValues.spotsAvailable}
              defaultValue="1"
              sx={{ mb: 4 }}
              style={alignLeft}
            />
          )}
          <TextField
            label="Description"
            multiline
            rows={4}
            maxRows={4}
            value={formValues.description}
            name="description"
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            required
          />

          <Container direction="row" style={alignLeft}>
            <AttachmentIcon /> <span>Attach Photo</span>
          </Container>

          <input
            type="file"
            accept="image/*,.pdf"
            name="eventImage"
            id="eventImage"
            onChange={handleFile}
            style={alignLeft}
          />

          <CreateEvent />
        </Container>
      </form>
    </MainWindow>
  );
};

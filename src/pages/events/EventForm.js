import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../config/globalStore";
import { Container } from "../../styled-components";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import { MenuItem, TextField, Stack } from "@mui/material";

// Date/Time Selection
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDatePicker, MobileTimePicker } from "@mui/lab";

// services
import { gymClasses } from "../../data/classes";
import BasicButton from "../../components/buttons/BasicButton";
import { useNavigate } from "react-router-dom";
import { useRedirectNonStaffMembers } from "../../config/customHooks";

export const EventForm = ({ submitFunction, event, eventId, buttonText }) => {
  useRedirectNonStaffMembers("/events");
  const navigate = useNavigate();
  const { store } = useGlobalState();
  const { profile } = store;
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [image, setImage] = useState(null);
  const initialValues = {
    name: "",
    description: "",
    category: "",
    spotsAvailable: null,
  };
  const [formValues, setFormValues] = useState(initialValues);

  // if user is editing event get info from props and set as current state
  useEffect(() => {
    if (event) {
      setFormValues({
        name: event.name,
        description: event.description,
        category: event.category,
        spotsAvailable: event.spotsAvailable,
      });
      setStartTime(new Date(event.startTime));
      setEndTime(new Date(event.endTime));
      setImage(event.eventImage);
    }
  }, [event]);

  // onChange event handler
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  // onSubmit event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    // combine all states to one object
    const infoToSend = {
      ...formValues,
      startTime: startTime,
      endTime: endTime,
      createdBy: profile._id,
      eventImage: image,
    };
    // convert to FormData so image file can be uploaded
    const data = new FormData();
    for (let key in infoToSend) {
      if (infoToSend[key]) data.append(`${key}`, infoToSend[key]);
    }
    // create or update event
    submitFunction(data, eventId);
  };

  // onChange handler for image form value
  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  // navigate user when cancel submission
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const alignLeft = {
    alignSelf: "flex-start",
    marginBottom: "30px",
  };

  const eventCategories = ["Class", "Competition", "Personal Training"];

  return (
    <form onSubmit={handleSubmit}>
      <Container style={{ minWidth: "400px" }}>
        <TextField
          select
          label="Event Type"
          required
          value={formValues.category}
          onChange={handleChange}
          name="category"
          helperText="Please select the event type"
          sx={{ mb: 2 }}
          fullWidth
        >
          {eventCategories.map((category, index) => (
            <MenuItem key={index} value={category}>{category}</MenuItem>
          ))}
        </TextField>

        {formValues.category === "" ? null : (
          <>
            {formValues.category === "Class" ? (
              <TextField
                select
                required
                label="Select Class"
                value={formValues.name}
                onChange={handleChange}
                name="name"
                // helperText="Please select class"
                fullWidth
              >
                {gymClasses.map((groupClass, index) => (
                  <MenuItem key={index} value={groupClass.name}>{groupClass.name}</MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                required
                label="Event Name"
                //   variant="outlined"
                fullWidth
                value={formValues.name}
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
                style={alignLeft}
              />
            )}

            <TextField
              label="Description"
              multiline
              rows={4}
              value={formValues.description}
              name="description"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />

            <Container direction="row" style={alignLeft}>
              <AttachmentIcon />
              <input
                type="file"
                accept="image/*,.pdf"
                name="eventImage"
                id="eventImage"
                onChange={handleImageUpload}
              />
            </Container>
            <Container direction="row">
              <BasicButton
                text={buttonText ? buttonText : "Submit"}
                type="submit"
              />
              <BasicButton
                text="Cancel"
                color="secondary"
                btnFunction={goBack}
              />
            </Container>
          </>
        )}
      </Container>
    </form>
  );
};

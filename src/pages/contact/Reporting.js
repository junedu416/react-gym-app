import React, { useState } from "react";
import { Heading, MainWindow } from "../../styled-components";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import Send from "../../components/buttons/Send";
import { UploadIcon } from "../../components/buttons/Upload";
import { Container } from "../../styled-components";
import { ContactSubheadings } from "../../styled-components/contact";
import CampaignIcon from "@mui/icons-material/Campaign";

export const Reporting = (props) => {
  const [inquiryType, setInquiryType] = useState("");

  const handleSelection = (event) => {
    setInquiryType(event.target.value);
  };

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <MainWindow>
      <Heading>Contact</Heading>

      <FormControl required sx={{ m: 1, minWidth: 340 }}>
        <InputLabel id="inquiryType">
          Inquiry Type
        </InputLabel>
        <Select
          labelId="inquiryType"
          id="inquiryType"
          value={inquiryType}
          label="Inquiry Type *"
          onChange={handleSelection}
        >
          <MenuItem value="Faulty Equipment">Faulty Equipment</MenuItem>
          <MenuItem value="Unsocial Behaviour">Unsocial Behaviour</MenuItem>
          <MenuItem value="General Inquiry">General Inquiry</MenuItem>
        </Select>
        <FormHelperText>Please select inquiry type (required)</FormHelperText>
      </FormControl>

      {inquiryType === ""
        ? null
        : [
            <Container>
              <ContactSubheadings>
                {inquiryType === ""
                  ? null
                  : inquiryType === "General Inquiry"
                  ? "General Inquiry"
                  : [
                      <CampaignIcon style={{ marginRight: "5px" }} />,
                      [
                        inquiryType === "Faulty Equipment"
                          ? "Report Faulty Equipment"
                          : "Report Unsocial Behaviour",
                      ],
                    ]}
              </ContactSubheadings>
              <Container style={{ flexDirection: "row" }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Your Message"
                  multiline
                  rows={4}
                  maxRows={4}
                  style={{ width: "300px" }}
                  value={value}
                  onChange={handleChange}
                ></TextField>
                <Container>
                  <Send />
                  <UploadIcon />
                  <AttachmentIcon />
                </Container>
              </Container>
            </Container>,
          ]}
    </MainWindow>
  );
};

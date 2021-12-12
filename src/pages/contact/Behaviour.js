import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import Send from "../../components/buttons/Send";
import { UploadIcon } from "../../components/buttons/Upload";
import { Container } from "../../styled-components";
import { ContactSubheadings } from "../../styled-components/contact";
import CampaignIcon from "@mui/icons-material/Campaign";

export const ReportUnsocialBehaviour = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container>
      <ContactSubheadings>
        <CampaignIcon style={{marginRight:"5px"}}/> Report Unsocial Behaviour
      </ContactSubheadings>
      <Container style={{flexDirection: "row"}}>
        <TextField
          id="outlined-multiline-flexible"
          label="Your Message"
          multiline
          rows={4}
          maxRows={4}
          style={{width:"300px"}}
          value={value}
          onChange={handleChange}
        ></TextField>
        <Container>
          <Send />
          <UploadIcon />
          <AttachmentIcon />
        </Container>
      </Container>
    </Container>
  );
};

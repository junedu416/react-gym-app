import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import Send from "../../components/buttons/Send";
import { UploadIcon } from "../../components/buttons/Upload";
import { Container } from "../../styled-components";

export const ReportFaultyEquipment = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container style={{flexDirection:"row", margin: "50px"}}>
      <Box>
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
      </Box>
      <Container>
        <Send />
        <UploadIcon />
        <AttachmentIcon />
      </Container>
    </Container>
  );
};

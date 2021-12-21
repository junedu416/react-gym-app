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
// import { UploadIcon } from "../../components/buttons/Upload";
import { Container } from "../../styled-components";
import { ContactSubheadings } from "../../styled-components/contact";
import CampaignIcon from "@mui/icons-material/Campaign";
import { postReport } from "../../services/reportServices";

// JUNE D 20/12/2021: UploadIcon has been removed. Can implement the function after MVP is done
// JUNE D 20/12/2021: There is no back-end routes for General Inquiry. Can implement the function after MVP is done

export const Reporting = () => {

  const [inquiryType, setInquiryType] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

  const uploadImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  const handleSelection = (event) => {
    setInquiryType(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSend =  async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('type', inquiryType);
    formData.append('description', value);
    formData.append('reportImage', selectedFile);

    await postReport(formData);
    setIsFilePicked(false);
    setMessage("report sent successfully!")

    setTimeout(() => {
      setMessage("")
    }, 5000);
  }

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
          name="type"
        >
          <MenuItem value="Faulty Equipment">Report Faulty Equipment</MenuItem>
          <MenuItem value="Unsocial Behaviour">Report Unsocial Behaviour</MenuItem>
          {/* <MenuItem value="General Inquiry">General Inquiry</MenuItem> */}
        </Select>
        <FormHelperText>Please select inquiry type (required)</FormHelperText>
      </FormControl>

      {inquiryType === ""
        ? null
        : [
            <Container align="flex-start" justify="flex-start">
              <form encType="multipart/form-data">
              <ContactSubheadings justify="flex-start">
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
              <Container direction="row" align="flex-start">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Your Message"
                  multiline
                  rows={4}
                  maxRows={4}
                  style={{ width: "300px" }}
                  value={value}
                  name="description"
                  onChange={handleChange}
                ></TextField>
                <Container>
                  <Send btnFunction={handleSend} />
                  {/* <UploadIcon /> */}
                  <AttachmentIcon btnFunction={uploadImage} />
                </Container>
              </Container>
              </form>
              {isFilePicked === true && <ContactSubheadings>Image selected!</ContactSubheadings>}
              {message !=="" && <ContactSubheadings>{message}</ContactSubheadings>}
            </Container>,
          ]}
    </MainWindow>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Heading,
  MainWindow,
  StyledAlert,
  TextLink,
} from "../../styled-components";
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
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useGlobalState } from "../../config/globalStore.js";
import { ViewReports } from "./ViewReports";
import { Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReusableAlert } from "../../components/ReusableAlert";

// JUNE D 20/12/2021: UploadIcon has been removed. Can implement the function after MVP is done
// JUNE D 20/12/2021: There is no back-end routes for General Inquiry. Can implement the function after MVP is done

export const Reporting = () => {
  const { store } = useGlobalState();
  const { profile } = store;
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [inquiryType, setInquiryType] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const uploadImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSelection = (event) => {
    setInquiryType(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("type", inquiryType);
    formData.append("description", value);
    formData.append("reportImage", selectedFile);
    formData.append("userId", profile.userId);

    await postReport(formData);
    setIsFilePicked(false);
    setMessage("report sent successfully!");

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <MainWindow>
      {console.log(profile)}
      <Container>
        {!profile && (
          <ReusableAlert
            open={open}
            btnFunction={() => {
              setOpen(false);
            }}
            text={
              <Container direction="row">
                {"Unauthorized access. Please"}
                <TextLink
                  mt="0"
                  p="0 5px"
                  onClick={() => navigate("/auth/login")}
                >
                  login
                </TextLink>
                {"first"}
              </Container>
            }
            severity="error"
          />
        )}
        {profile && !profile.isStaff && (
          <Container>
            <Heading>Report</Heading>
            <FormControl required sx={{ m: 1, minWidth: 340 }}>
              <InputLabel id="inquiryType">Inquiry Type</InputLabel>
              <Select
                labelId="inquiryType"
                id="inquiryType"
                value={inquiryType}
                label="Inquiry Type *"
                onChange={handleSelection}
                name="type"
                inputProps={{ "data-testid": "select-input" }}
              >
                <MenuItem value="Faulty Equipment">
                  Report Faulty Equipment
                </MenuItem>
                <MenuItem value="Unsocial Behaviour">
                  Report Unsocial Behaviour
                </MenuItem>
                {/* <MenuItem value="General Inquiry">General Inquiry</MenuItem> */}
              </Select>
              <FormHelperText>
                Please select inquiry type (required)
              </FormHelperText>
            </FormControl>

            {inquiryType === ""
              ? null
              : [
                  <Container align="flex-start" justify="flex-start">
                    <form encType="multipart/form-data">
                      <ContactSubheadings justify="flex-start">
                        {inquiryType === "General Inquiry"
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
                          style={{ width: "300px" }}
                          value={value}
                          name="description"
                          onChange={handleChange}
                          inputProps={{ "data-testid": "description" }}
                        ></TextField>
                        <Container>
                          <Send btnFunction={handleSend} />
                          {/* <UploadIcon /> */}
                          <AttachmentIcon btnFunction={uploadImage} />
                        </Container>
                      </Container>
                    </form>
                    {isFilePicked === true && (
                      <ContactSubheadings>Image selected!</ContactSubheadings>
                    )}
                    {message !== "" && (
                      <ContactSubheadings data-testid="message">
                        {message}
                      </ContactSubheadings>
                    )}
                  </Container>,
                ]}
          </Container>
        )}
      </Container>

      {profile && profile.isStaff && <ViewReports />}
    </MainWindow>
  );
};

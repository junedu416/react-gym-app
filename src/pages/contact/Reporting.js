import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Heading, TextLink } from "../../styled-components";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import Send from "../../components/buttons/Send";
import { Container } from "../../styled-components";
import { ContactSubheadings } from "../../styled-components/contact";
import CampaignIcon from "@mui/icons-material/Campaign";
import { postReport } from "../../services/reportServices";
import { useGlobalState } from "../../config/globalStore.js";
import { ViewReports } from "./ViewReports";
import { Collapse } from "@mui/material";
import { ReusableAlert } from "../../components/ReusableAlert";
import { useRedirectUnauthorisedUser } from "../../config/customHooks";

export const Reporting = () => {
  useRedirectUnauthorisedUser();
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
    setMessage("Report sent successfully!");

    setTimeout(() => {
      setMessage("");
    }, 5000);

    navigate("/Overview");
  };

  return (
    <>
      <Container>
        {!profile && (
          <Collapse in={open}>
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
            />
          </Collapse>
        )}

        {/* Page View for member */}
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
                          <AttachmentIcon btnFunction={uploadImage} />
                        </Container>
                      </Container>
                    </form>
                    {isFilePicked === true && (
                      <ContactSubheadings style={{ color: "lime"}}>Image selected!</ContactSubheadings>
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
        
      {/* Page View for staff */}
      {profile && profile.isStaff && <ViewReports />}
    </>
  );
};

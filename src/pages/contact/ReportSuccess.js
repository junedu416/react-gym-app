import React from "react";
import { ReusableModal } from "../../components/ReusableModal";

export const ReportSuccess = () => {
  const text =
    "Thank you for sending your report. A staff member will handle this matter as soon as possible. If it is an emergency and needs immediate attention, please go to the reception and call for a staff member.";
  return (
  <ReusableModal title="Report Successfully Sent" children={text} />
  )
};

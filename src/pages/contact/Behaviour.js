import React, { useState } from "react";
import AttachmentIcon from "../../components/buttons/AttachmentIcon";
import Send from "../../components/buttons/Send";
import { UploadIcon } from "../../components/buttons/Upload";

export const ReportUnsocialBehaviour = () => {

  return (
    <>
      <Send />
      <UploadIcon />
      <AttachmentIcon />
    </>
  );
};

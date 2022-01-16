import React from "react";
import { Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ReportIcon from "@mui/icons-material/Report";

export const ReportStatusIcon = ({resolved}) => {
    return(
        <Chip
            icon={resolved ? <DoneIcon /> : <ReportIcon />}
            color={resolved ? "success" : "error"}
            label={resolved ? "Resolved" : "Unresolved"}
            variant="filled"
          />
    )
}
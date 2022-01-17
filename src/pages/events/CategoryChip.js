import React from 'react';
import Chip from "@mui/material/Chip";

export const CategoryChip = ({category}) => {
    
    function determineColor(category) {
        if (category === "Class") return "success";
        else if (category === "Personal Training") return "warning";
        else if (category === "Competition") return "error";
        else return "primary";
    }

    return(
        <Chip label={category} color={determineColor(category)} variant="outlined" />
    )
}
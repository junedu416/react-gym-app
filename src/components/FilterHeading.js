import { AccordionSummary, Typography } from "@mui/material";

export const FilterHeading = (props) => {
  const { expanded, panel, text, sx } = props;

  return (
    <AccordionSummary>
      <Typography
        fontWeight="bold"
        sx={{ ...sx }}
        color={expanded === panel ? "blue" : "black"}
      >
        {text}
      </Typography>
    </AccordionSummary>
  );
};

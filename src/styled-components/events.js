import styled from "styled-components";
import Box from "@mui/material/Box";

export const FilterBox = styled(Box)`
  position: absolute;
  padding: 0 20px;
  top: 40px;
  right: 0px;
  left: 0px;
  min-width: 250px;
  min-height: 400px;
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgrey;
  box-shadow: 
    6px 6px 12px -5px #777,
    -1px 3px 12px -5px #888,
    0 20px 40px 16px rgba(0, 0, 0, 0.095);

  /* filter: drop-shadow(0px 0px 20px rgba(0,0,0, 0.3)); */
  
  /* box-shadow:
  0 2px 2px rgba(0, 0, 0, 0.034),
  0 4px 5px rgba(0, 0, 0, 0.048),
  0 6px 10px rgba(0, 0, 0, 0.06),
  0 8px 20px 10px rgba(0, 0, 0, 0.072),
  0 20px 30px 12px rgba(0, 0, 0, 0.086),
  0 12px 90px rgba(0, 0, 0, 0.15); */

`;

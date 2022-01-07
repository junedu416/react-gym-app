import styled from "styled-components";
import Box from "@mui/material/Box";

export const FilterBox = styled(Box)`
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  min-width: 250px;
  min-height: 400px;
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgrey;
  box-shadow: 6px 6px 12px -5px #777;
  padding: 10px;
`;

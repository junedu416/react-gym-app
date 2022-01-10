import styled from "styled-components";
import Box from "@mui/material/Box";

export const FilterBox = styled(Box)`
  position: absolute;
  top: 50px;
  right: 0px;
  left: 100px;
  min-width: 210px;
  z-index: 5;
  border-radius: 10px;
  box-shadow: 
    6px 6px 8px -5px #777,
    -1px 3px 10px -5px #888,
    0 8px 30px 1px rgba(0, 0, 0, 0.095);
`;

export const FilterItem = styled.div`
  background-color: white;
  border-radius: 8px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;

  &:hover {
      background-color: rgba(0, 145, 250, 0.18);
      cursor: pointer;
  }
`

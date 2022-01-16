import styled from "styled-components";
import Box from "@mui/material/Box";

export const FilterBox = styled(Box)`
  position: absolute;
  /* SWITCH AROUND WHEN PASSING DESKTOP PROP IN  (DON'T NEED TO ATM) */ 
  bottom: ${props => props.desktop ? "" : "50px" };
  top: ${props => props.desktop ? "50px" : "" };
  right: 20px;
  /* left: 100px; */
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

export const ClearButtonFade = styled.div`
  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
      height: ${props => props.applyButton ? 0 : "100%"};
    }
    100% {
      opacity: 1;
      height: ${props => props.applyButton ? "48px" : "100%"};
    }
  }
  @keyframes fadeOutAnimation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export const EventImage = styled.img`
  max-width: 90vw;
  max-height: 400px;
  @media(min-width: 768px) {
        max-width: 600px;
        max-height: 60vh;
  }
`

export const ShowEventContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media(min-width: 768px) {
      min-width: 80%;
  }
`

export const Description = styled.p`
  text-align: left;
  padding: 0 10px;
  @media(min-width: 768px) {
    font-size: 16px;
    max-width: 700px;
  }
`
export const EventCardDiv = styled.div`
  /* margin: 10px; */
  padding: 20px 30px 0 30px;
`

export const StyledBox = styled(Box)`
  @media(max-width: 500px) {
    width: 100%;
  }
`
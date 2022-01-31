import styled from "styled-components";
import Box from "@mui/material/Box";
import { backgroundColor, shadow, containEventInScreen, mainParagraphColor, centered, flexbox } from "./mixins";

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
  ${containEventInScreen};
  border-radius: 20px;
  max-height: 400px;
  @media(min-width: 768px) {
        max-height: 60vh;
  }
  
`

// You can add those with mixins to be dry.
export const ShowEventContent = styled.div`

  ${flexbox}
  ${centered}
/* 
  display: flex;
  flex-direction: column;
  align-items: center; */
  text-align: center;
  @media(min-width: 768px) {
      min-width: 80%;
  }
`

export const Description = styled.p`
  text-align: left;
  padding: 0 10px;
  white-space: pre-line;
  @media(min-width: 768px) {
    font-size: 1.2rem;
  }
`
export const EventCardDiv = styled.div`
  /* margin: 10px; */
  padding: 20px 30px 0 30px;
`

export const DescriptionDiv = styled.div`
  ${containEventInScreen};
  ${backgroundColor};
  ${shadow};
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const TrainerName = styled.h3`
  ${mainParagraphColor};
  font-size: 1.3rem;

`

export const SpotsLeft = styled.p`
  color: ${props => props.spotsAvailable < 3 ? "rgb(244,67,53)" : "rgb(0, 196, 0)"};
  font-size: 1.2rem;
`

// Styling that targets classes in React Big Calendar
export const Wrapper = styled.div`
  & .rbc-allday-cell {
  display: none;
  }

  & .rbc-toolbar {
    position: sticky;
    top: -1px;
    z-index: 2;
    background: rgb(250, 250, 250);
    margin: 0;
    padding: 3px 0 10px;
  }

  & .rbc-time-header {
    position: sticky;
    top: 41px;
    color: #0d47a1;
    z-index: 2;
    background: rgb(250, 250, 250);
  }

  & .rbc-time-gutter {
    background: rgb(250, 250, 250);
    color: #0d47a1;
    width: 66px;
    text-align: center;
    font-weight: bold; 
    /* position: sticky !important; */
    /* position: sticky; */
    /* overflow-y: hidden; */
    /* left: 0px; */
    /* top: 42px; */
    /* background: red; */
  }

  & .rbc-time-column {
    /* THIS IS BACKGROUND COLOR FOR CELLS */
    /* background: grey; */
    
    /* font-weight: bold; */    
  }
`
import styled from "styled-components";
import { mainTextColor } from "./mixins";

export const WidgetTitle = styled.h3`
    ${mainTextColor}; 
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 0;
`

export const GreyText = styled.p`
    color: rgb(89, 89, 89);
    font-size: 1.3rem;
`

export const EventTitle = styled.h4`
    text-transform: uppercase;
    margin: 0;
    font-size: 1.1rem;
`
export const EventDiv = styled.div`
    /* border: solid 1px black; */
    width: 100%;
    margin: 0;
`

export const EventParag = styled.p`
    margin: 0;
    padding: 0;
`

export const AlignRight = styled.div`
    text-align: right;
    margin: 0;
    padding: 0;
    width: 100%;
`
export const CompTitle = styled.h4`
    text-transform: uppercase;
    margin: 0 0 8px 0;
    font-size: 1.1rem;
`

export const CompTimes = styled.p`
    margin: 0;
    padding: 5px 0;
`

export const TimeDiv = styled.div`
    margin: 8px 0 10px 0;
    text-align: center;
`
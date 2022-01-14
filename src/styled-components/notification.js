import styled from "styled-components";

export const NotificationContainer = styled.div`
    width: ${props => props.desktop ? "calc(100vw - 220px)" : props.open ? "calc(100vw - 220px)" : "100vw"};
    right: 0;
    height: ${props => props.active ? '50px' : 0};
    position: absolute;
    text-align: center;
    opacity: ${props => props.active ? '100%' : 0};
    background-color: ${props => props.color ? props.color : "#173F5F"};
    transition: height 1s, opacity 1s;
    border: none;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
        padding: 0;
        color: white;
    }

    button {
        /* position: absolute; */
        /* right: 0; */
        /* top: 30%; */
        background-color: rgba(255,2552,255,0);
        border: none;
    }
`
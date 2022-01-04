import styled from "styled-components";

export const NotificationContainer = styled.div`
    width: calc(100vw - 230px);
    right: 0;
    height: ${props => props.active ? '8vh' : 0};
    position: absolute;
    text-align: center;
    opacity: ${props => props.active ? '100%' : 0};
    background-color: ${props => props.color ? props.color : "blue"};
    transition: height 1s, opacity 1s;
    border: none;

    h3 {
        padding: 0;
        color: white;
    }

    button {
        position: absolute;
        right: 0;
        top: 30%;
        background-color: rgba(255,2552,255,0);
        border: none;
    }
`
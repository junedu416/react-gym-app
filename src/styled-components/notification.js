import styled from "styled-components";

export const NotificationContainer = styled.div`
    width: calc(100vw - 230px);
    right: 0;
    height: ${props => props.active ? '10vh' : 0};
    position: absolute;
    text-align: center;
    opacity: ${props => props.active ? '100%' : 0};
    background-color: blue;
    transition: height 1s, opacity 1s;

    h3 {
        padding: 0;
        color: white;
    }

    button {
        position: absolute;
        right: 0;
        top: 30%;
    }
`
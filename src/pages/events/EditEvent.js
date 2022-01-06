import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { MainWindow } from '../../styled-components';

export const EditEvent = () => {
    const {state} = useLocation()
    const {event} = state;
    const [formValues, setFormValues] = useState(event)
    console.log(formValues)
    return(
        <MainWindow>
        <h1>EDIT EVENT PAGE</h1>
        </MainWindow>
    )
}
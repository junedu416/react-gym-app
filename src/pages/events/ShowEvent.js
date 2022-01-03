import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { MainWindow } from '../../styled-components'
import { getEventById } from '../../services/eventsServices'

export const ShowEvent = () => {
    const {id} = useParams();
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getEventById(id)
        .then((response) => {
            console.log("loaded response is: ", response)
            setEvent(response)
        }).then(() => setLoading(false))
        .catch((error) => {
            console.log(error)
            setLoading(false)
            setErrorMsg("Oops, something went wrong.")
        })
    }, [id])

    return(
        <MainWindow>
            <h1>Show Event Page</h1>
            {loading && <p>Loading...</p>}
            {errorMsg && <p>{errorMsg}</p>}
            {event && 
                <div>
                    <h2>{event.name}</h2>
                </div>
            }
        </MainWindow>
    )
}
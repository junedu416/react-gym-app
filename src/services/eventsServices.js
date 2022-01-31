import gymApi from '../config/api';

// connecting to the server routes to push/retrieve info

// GET  all existing events from backend
export const getAllEvents = async () => {
    try {
        const response = await gymApi.get('/events')
        console.log("Fetched Events Data: ", response.data)
        return response.data
    } catch (e) {
        return e.message
    }
}

// GET a single exising event
export const getEventById = async (id) => {
    try {
        const response = await gymApi.get(`/events/${id}`)
        console.log(response.data)
        return response.data
    } catch (e) {
        return e.message
    }
}

// POST new event i.e PT, Class or Comp (staff only)
export const createNewEvent = async (eventObj) => {
    try {
        const response = await gymApi.post('/events', eventObj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(`printing response data: `, response.data)
        // any validation error will be returned as response.data.error
        return response.data
    } catch(e) {
        console.log(`error caught: `, e)
        throw e
    }
}


// PUTS (update) existing event (staff only (?))
export const editEvent = async (id, eventObj) => {
    try {
        const response = await gymApi.put(`/events/${id}`, eventObj)
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log(e)
        throw e
    }
}

// DELETES existing event (CREATOR OF THE EVENT ONLY)
export const deleteEvent = async (id) => {
    try {
        const response = await gymApi.delete(`/events/${id}`)
        console.log(response.data)
        return response.data
    } catch (e) {
        console.log (e)
    }
}


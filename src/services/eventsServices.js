import gymApi from '../config/api';

// connecting to the server routes to push/retrieve info

// GET  all existing events from backend
export const getAllEvents = async () => {
    try {
        const response = await gymApi.get('/events')
        console.log(response)
        return response
    } catch (e) {
        console.log(e)
        throw e
    }
}

// GET a single exising event
export const getEventById = async (id) => {
    try {
        const response = await gymApi.get(`/events/${id}`)
        console.log(response)
        return response
    } catch (e) {
        console.log(e)
        throw e
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

        console.log("success path")
        console.log(response.data)
        return response.data
    } catch(e) {
        console.log("caught error", e.message)
        return {message: e.message}
    }
}


// PUTS (update) existing event (staff only (?))
export const editEvent = async (id, eventObj) => {
    try {
        const response = await gymApi.puts(`/events/${id}`, eventObj)
        console.log(response)
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
        console.log(response)
        return response.data
    } catch (e) {
        console.log (e)
    }
}


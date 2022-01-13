import { convertTimeToAcceptedFormat, filterEventsByCategory } from "./events-helper-functions"

export const eventsReducer = (state, action) => {
    switch(action.type) {
        case 'setEventsList': {
            return {
                ...state,
                events: action.data
            }
        }
        case 'setCategorisedEventsList': {
            // const filteredEvents = state.events.filter((event) => event.category.toLowerCase() === action.data.toLowerCase())
            const filteredEvents = filterEventsByCategory(state.events, action.data.category, action.data.profile)
            return {
                ...state,
                filteredEvents: filteredEvents
            }
        }
        case 'updateSingleEvent': {
            const indexOfeventToUpdate = state.events.findIndex((event) => event._id === action.data._id)
            const clonedEvents = [...state.events]
            const updatedEvent = convertTimeToAcceptedFormat(action.data)
            clonedEvents[indexOfeventToUpdate] = updatedEvent;
            return {
                ...state,
                events: clonedEvents
            }
        }
        default: return state
    }
}
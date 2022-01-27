import { convertTimeToAcceptedFormat, filterEventsByCategory, filterEventsByTrainer } from "./events-helper-functions"

export const eventsReducer = (state, action) => {
    switch(action.type) {
        case 'setEventsList': {
            return {
                ...state,
                events: action.data
            }
        }
        case 'setCategorisedEventsList': {
            const filteredEvents = filterEventsByCategory(state.events, action.data.category, action.data.profile)
            return {
                ...state,
                filteredEvents: filteredEvents
            }
        }
        case 'updateSingleEvent': {
            const indexOfEventToUpdate = state.events.findIndex((event) => event._id === action.data._id)
            const clonedEvents = [...state.events]
            const updatedEvent = convertTimeToAcceptedFormat(action.data)
            clonedEvents[indexOfEventToUpdate] = updatedEvent;
            return {
                ...state,
                events: clonedEvents
            }
        }
        case 'filterByTrainer': {
            const filteredEvents = filterEventsByTrainer(state.events, action.data.category, action.data.trainerId)
            return {
                ...state,
                filteredEvents: filteredEvents
            }
        }

        default: return state
    }
}
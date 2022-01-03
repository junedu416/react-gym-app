
export const eventsReducer = (state, action) => {
    switch(action.type) {
        case 'setEventsList': {
            return {
                ...state,
                events: action.data
            }
        }
        case 'setCategorisedEventsList': {
            const filteredEvents = state.events.filter((event) => event.category.toLowerCase() === action.data.toLowerCase())
            return {
                ...state,
                events: filteredEvents
            }
        }
        default: return state
    }
}
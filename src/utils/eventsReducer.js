export const eventsReducer = (state, action) => {
    switch(action.type) {
        case "setEvent": {
            // action.data = {title:.... start:....., end:.....}
            if(action.data.startDate === action.data.endDate) {
                action.data.endDate = null;
            }
            return {
                title: action.data.title,
                startDate: action.data.startDate,
                endDate: action.data.endDate,
                startTime: action.data.startTime,
                endTime: action.data.endTime
            }
        }
        case "deselectEvent": {
            return {
                title: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: ''
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
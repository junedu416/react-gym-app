const globalReducer = (state, action) => {
    switch(action.type) {
        case "setProfile":
            return {
                ...state,
                profile: action.data
            };
        case "toggleCheckIn":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    checkedIn: !state.profile.checkedIn
                }
            }
        case "setNotification":
            return {
                ...state,
                notificationMsg: action.data
            }
        default: 
            throw new Error("Undefined global action");
    }
}

export default globalReducer;
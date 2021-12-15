const globalReducer = (state, action) => {
    switch(action.type) {
        case "setProfile":
            return {
                ...state,
                profile: action.data
            };
        default: 
            throw new Error("Undefined global action");
    }
}

export default globalReducer;
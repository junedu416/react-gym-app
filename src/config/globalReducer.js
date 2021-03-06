const globalReducer = (state, action) => {
  switch (action.type) {
    case "setProfile":
      return {
        ...state,
        profile: action.data,
      };
    case "toggleCheckIn":
      return {
        ...state,
        profile: {
          ...state.profile,
          checkedIn: !state.profile.checkedIn,
        },
      };

    case "setNotification":
      return {
        ...state,
        notificationMsg: action.data,
      };

    case "addExerciseToProfile":
      return {
        ...state,
        profile: {
          ...state.profile,
          workouts: action.data,
        },
      };

    case "setWorkout":
      return {
        ...state,
        profile: {
          ...state.profile,
          workouts: action.data,
        },
      };

    case "addNewWorkout":
      return {
        ...state,
        profile: {
          ...state.profile,
          workouts: [...state.profile.workouts, action.data],
        },
      };
    case "selectWorkout":
      return {
        ...state,
        workoutIndex: action.data,
      };

    case "setAllEvents":
      return {
        ...state,
        allevents: action.data,
      };

    default:
      throw new Error("Undefined global action");
  }
};

export default globalReducer;

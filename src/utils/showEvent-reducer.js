import moment from "moment";

export const showEventReducer = (state, action) => {
  switch (action.type) {
    case "setEvent": {
      return {
        ...state,
        name: action.data.name,
        category: action.data.category,
        description: action.data.description,
        startTime: action.data.startTime,
        endTime: action.data.endTime,
        spotsAvailable: action.data.spotsAvailable,
        registeredUsers: action.data.registeredUsers,
        _id: action.data._id,
        eventImage: action.data.eventImage,
      };
    }
    case "updateEvent": {
      return {
        ...state,
        ...action.data,
      };
    }
    case "setEventTimes": {
      const startDate = moment(action.data.startTime).format("Do [of] MMM");
      const startTime = moment(action.data.startTime).format("h:mm A");
      const endDate = moment(action.data.endTime).format("Do [of] MMM");
      const endTime = moment(action.data.endTime).format("h:mm A");
      const isFinished = moment().isAfter(action.data.endTime);
      return {
        ...state,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        isFinished: isFinished,
      };
    }
    default: {
      return state;
    }
  }
};

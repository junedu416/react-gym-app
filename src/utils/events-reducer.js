import {
  convertTimeToAcceptedFormat,
  filterEventsByCategory,
  filterEventsByTrainer,
  filterEventsByTrainerParams,
  filterEventsByClass,
  filterClassesByTrainer,
  resetEventFilters,
} from "./events-helper-functions";


export const eventsReducer = (state, action) => {
  switch (action.type) {
    case "setEventsList": {
      return {
        ...state,
        events: action.data,
      };
    }
    case "setCategorisedEventsList": {
      const filteredEvents = filterEventsByCategory(
        state.events,
        action.data.category,
        action.data.profile
      );
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }
    case "updateSingleEvent": {
      const indexOfEventToUpdate = state.events.findIndex(
        (event) => event._id === action.data._id
      );
      const clonedEvents = [...state.events];
      const updatedEvent = convertTimeToAcceptedFormat(action.data);
      clonedEvents[indexOfEventToUpdate] = updatedEvent;
      return {
        ...state,
        events: clonedEvents,
      };
    }
    case "filterByTrainerParams": {
      const filteredEvents = filterEventsByTrainerParams(
        state.events,
        action.data.category,
        action.data.trainerId
      );
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }
    case "filterByClass": {
      const filteredEvents = filterEventsByClass(
        state.events,
        action.data.category,
        action.data.gymClass,
      );
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }

    case "filterEventsByTrainer": {
      const filteredEvents = filterEventsByTrainer(
        state.events,
        action.data.category,
        action.data.trainers,
        null,
        // action.data.trainerFullname,
        // action.data.trainerId,
      );
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }

    case "filterClassesByTrainer": {
      const filteredEvents = filterClassesByTrainer(
        state.events,
        action.data.category,
        null,
        action.data.trainers,
        // action.data.trainerFullname,
        // action.data.trainerId,
      );
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }

    case "resetEvents": {
      const filteredEvents = resetEventFilters(
        state.events,
        action.data.category,
      );
      return {
        ...state,
        filteredEvents: filteredEvents,
      };
    }

    default:
      return state;
  }
};

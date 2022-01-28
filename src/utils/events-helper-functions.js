export const isUserRegistered = (profile, registrationList) => {
  if (!profile || !registrationList) return false;
  return registrationList.includes(profile._id);
};

// filters events by event.category OR by event.registeredUsers (check if current user is registered)
// returns all events that match filter requirement
export const filterEventsByCategory = (events, category, profile) => {
  let filteredEvents;
  if (category === "registered events") {
    filteredEvents = events.filter((event) =>
      isUserRegistered(profile, event.registeredUsers)
    );
  } else {
    filteredEvents = events.filter(
      (event) => event.category.toLowerCase() === category.toLowerCase()
    );
  }
  return filteredEvents;
};

export const filterEventsByTrainer = (events, category, trainerId) => {
  let filteredEvents;
  if (category === "personal training") {
    filteredEvents = events.filter(
      (event) =>
        event.category.toLowerCase() === category.toLowerCase() &&
        event.createdBy === trainerId
    );
  }
  return filteredEvents;
};

export const filterEventsByClass = (events, category, gymClass) => {
  let filteredEvents = [];
  if (category === "Class") {
    gymClass.map((item) => {
      events.filter((event) => {
        if (event.name === item) {
          filteredEvents.push(event);
        }
      });
    });
  }
  //   console.log("Filtered Events By Class: ", filteredEvents);

  return filteredEvents;
};

export const convertTimeToAcceptedFormat = (eventObj) => {
  eventObj.startTime = new Date(eventObj.startTime);
  eventObj.endTime = new Date(eventObj.endTime);
  return eventObj;
};

// adds user to event.registeredUsers array and makes post request to update backend
export const registerUserToEvent = (
  event,
  registeringUserId,
  updateFunction
) => {
  const columnsToUpdate = {
    registeredUsers: [...event.registeredUsers, registeringUserId],
  };
  if (event.category !== "Competition") {
    columnsToUpdate.spotsAvailable = event.spotsAvailable - 1;
  }
  console.log("updating following columns: ", columnsToUpdate);
  updateFunction(columnsToUpdate, "Successfully registered");
};

// removes user to event.registeredUsers array and makes post request to update backend
export const cancelUserRegistration = (
  event,
  registeringUserId,
  updateFunction
) => {
  const registeredClone = [...event.registeredUsers];
  const updatedRegisteredUsers = registeredClone.filter(
    (id) => id !== registeringUserId
  );

  const columnsToUpdate = {
    registeredUsers: updatedRegisteredUsers,
  };
  if (event.category !== "Competition") {
    columnsToUpdate.spotsAvailable = event.spotsAvailable + 1;
  }
  console.log(
    "cancelling event registration with following changes: ",
    columnsToUpdate
  );
  updateFunction(columnsToUpdate, "Successfully cancelled your registration");
};

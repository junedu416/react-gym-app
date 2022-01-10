
export const isUserRegistered = (profile, registrationList) => {
    if (!profile || !registrationList) return false 
    return registrationList.includes(profile._id)
}

export const convertTimeToAcceptedFormat = (eventObj) => {
    eventObj.startTime = new Date(eventObj.startTime);
    eventObj.endTime = new Date(eventObj.endTime);
    return eventObj
}

export const registerUserToEvent = (event, registeringUserId, updateFunction) => {
    const columnsToUpdate = {
        registeredUsers: [...event.registeredUsers, registeringUserId]
    };
    if(event.category !== "Competition") {
        columnsToUpdate.spotsAvailable = event.spotsAvailable - 1
    }
    console.log("updating following columns: ", columnsToUpdate)
    updateFunction(columnsToUpdate, "Successfully registered")
}

export const cancelUserRegistration = (event, registeringUserId, updateFunction) => {
    const registeredClone = [...event.registeredUsers];
    const updatedRegisteredUsers = registeredClone.filter((id) => id !== registeringUserId)

    const columnsToUpdate = {
        registeredUsers: updatedRegisteredUsers
    }
    if(event.category !== "Competition") {
        columnsToUpdate.spotsAvailable = event.spotsAvailable + 1
    }
    console.log("cancelling event registration with following changes: ", columnsToUpdate)
    updateFunction(columnsToUpdate, "Successfully cancelled your registration")
}
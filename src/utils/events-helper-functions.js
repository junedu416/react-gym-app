
export const isUserRegistered = (profile, registrationList) => {
    if (!profile || !registrationList) return false 
    return registrationList.includes(profile._id)
}

export const convertTimeToAcceptedFormat = (eventObj) => {
    eventObj.startTime = new Date(eventObj.startTime);
    eventObj.endTime = new Date(eventObj.endTime)
    console.log(eventObj)
    return eventObj
}

export const isUserRegistered = (profile, registrationList) => {
    if (!profile || !registrationList) return false 
    return registrationList.includes(profile._id)
}
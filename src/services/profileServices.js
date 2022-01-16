import gymApi from '../config/api';

// edit workout in profile
export const editProfile = async (uid, profileObj) => {
    try {
        const response = await gymApi.put(`/profiles/${uid}`, profileObj)
        console.log(response)
        return response
    }catch(e) {
        console.log("Error happened when trying to edit profile:", e)
        throw e
    }
}

export const addProfileImage = async (uid, imgObj) => {
    try {
        const response = await gymApi.put(`/profiles/${uid}/photo`, imgObj)
        console.log(response)
        return response
    } catch (e) {
        console.log("Error updating image in backend", e)
        throw e
    }
}

export const getStaffProfiles = async () => {
    try{
        const response = await gymApi.get(`/profiles/staff/all`)
        return response.data
    } catch(e) {
        console.log("Error loading staff Info", e)
        throw e
    }
}
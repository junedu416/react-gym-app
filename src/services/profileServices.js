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
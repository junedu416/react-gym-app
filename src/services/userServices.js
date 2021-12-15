import gymApi from "../config/api";

export const signUpUser = async (userDetails) => {
    try {
        const response = await gymApi.post('/users/sign-up', userDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response.data
    } catch(e) {
        console.log(e)
        throw e
    }
}
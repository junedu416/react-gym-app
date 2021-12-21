import gymApi from "../config/api";

export const signUpUser = async (userDetails) => {
    let response;
    try {
        response = await gymApi.post('/users/sign-up', userDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        return response.data
    } catch(e) {
        console.log("sign up error", e)
        throw e
    }
}

export const signOutUser = async () => {
    try {
        const response = await gymApi.post('/users/sign-out');
        console.log(response.data)
        return response.data
    } catch(e) {
        console.log("sign out error", e);
        throw e;
    }
}

export const signInUser = async (userDetails) => {
    try {
        const response = await gymApi.post('/users/sign-in', userDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;
    } catch(e) {
        console.log("sign in error", e);
        throw e;
    }
}
import gymApi from "../config/api";

export async function checkIn(user) {
    try {
        const response = await gymApi.post("/checkin/check-in", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch(e) {
        console.log(e);
    }
}

export async function checkOut(user) {
    try {
        const response = await gymApi.post("/checkin/check-out", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch(e) {
        console.log(e);
    }
}
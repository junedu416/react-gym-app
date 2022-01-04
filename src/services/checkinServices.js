import gymApi from "../config/api";

export async function checkIn(user) {
    try {
        const response = await gymApi.post("/checkin/check-in", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
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
        console.log(response.data);
        return response.data;
    } catch(e) {
        console.log(e);
    }
}

export async function getCheckedIn() {
    try {
        const response = await gymApi.get("/checkin");
        return response.data;
    } catch(e) {
        console.log(e);
    }
}
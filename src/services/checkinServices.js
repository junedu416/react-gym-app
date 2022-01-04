import gymApi from "../config/api";

export async function checkIn() {
    try {
        const response = await gymApi.post("/checkin/check-in");
        return response.data;
    } catch(e) {
        console.log(e);
    }
}

export async function checkOut() {
    try {
        const response = await gymApi.post("/checkin/check-out");
        return response.data;
    } catch(e) {
        console.log(e);
    }
}
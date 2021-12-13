import axios from "axios";

const gymApi = axios.create({
    baseURL: process.env.GYM_APP_API
})

export default gymApi;
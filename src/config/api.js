import axios from "axios";

const gymApi = axios.create({
  // baseURL: 'https://gym-dev-server.herokuapp.com'
  baseURL: "http://localhost:3000",
});

export default gymApi;

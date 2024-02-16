import axios from "axios";

const api = axios.create({
    // baseURL: "https://ajudame-server.herokuapp.com"
    // baseURL:  "http://10.0.2.2:3001",
    baseURL:  "https://4dc7-2804-d55-4026-900-cdb-9cb4-9f71-ab6a.ngrok-free.app",
})
export default api;
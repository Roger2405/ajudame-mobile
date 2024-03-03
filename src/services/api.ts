import axios from "axios";

const api = axios.create({
    baseURL: "https://ajudame-server.herokuapp.com"
    // baseURL:  "http://10.0.2.2:3001",
    // baseURL:  "https://374d-2804-d55-4026-900-69ec-b7d-7bbd-3344.ngrok-free.app",
})

export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "https://ajudame-server.herokuapp.com"
    // baseURL: "https://3d4e-45-166-249-201.sa.ngrok.io"
})

export default api;
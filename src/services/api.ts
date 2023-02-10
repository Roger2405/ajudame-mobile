
import axios from "axios";


const api = axios.create({
    // baseURL: 'https://ajudame-server.herokuapp.com'
    baseURL: 'https://1a00-45-182-155-70.sa.ngrok.io'
})

export default api;
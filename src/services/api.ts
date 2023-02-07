
import axios from "axios";


const api = axios.create({
    // baseURL: `http://10.0.2.2:3001`,
    // baseURL: 'https://server-ajudame-dev.loca.lt'
    baseURL: 'https://ajudame-server.herokuapp.com'
    // baseURL: 'https://9bfe-45-182-155-70.sa.ngrok.io'
})

export default api;
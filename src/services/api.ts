
import axios from "axios";


const api = axios.create({
    // baseURL: `http://10.0.2.2:3001`,
    baseURL: 'https://069e-45-182-155-70.sa.ngrok.io'
})

export default api;
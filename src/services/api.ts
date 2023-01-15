import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const { user } = useContext(AuthContext)
const username = 'username';
const password = 'password';

// const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');

// const authorization = `Basic ${username}`;
// const api = axios.create({
//     url: 'http://10.0.2.2:3001/1',
//     // headers: {
//     //     Authorization: authorization,
//     // },
//     // auth: {
//     //     username: 'rogerdr.rdr@gmail.com',
//     //     password: '12345678'
//     // }

// });



async function getUserFromAsyncStorage() {
    const user = await AsyncStorage.getItem('@AjudaME:user');
    let objUser: { id: number, email: string } = user ? JSON.parse(user) : {} as { id: number, email: string };
    return objUser;
}
let userFromAsyncStorage: { id: number, email: string } = {} as { id: number, email: string };
getUserFromAsyncStorage().then(user => {
    userFromAsyncStorage = user;
})
const api = axios.create({
    baseURL: `http://10.0.2.2:3001`,
    // baseURL: `https://server-ajudame.vercel.app/${userFromAsyncStorage.id}`,
})


export default api;
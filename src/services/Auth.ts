import axios from "axios";

interface Response {
    user: {
        id: number,
        email: string
    }
}

// export function signIn() {
//     return new Promise<Response>(
//         resolve => {
//             setTimeout(() => {
//                 resolve({
//                     user: {
//                         id: 10,
//                         email: 'teste@demo.com'
//                     }
//                 })
//             }, 1000)
//         }
//     )
// }


export async function signIn<Response>(email: string, password: string) {
    try {
        const response = await axios.post(`https://server-ajudame.vercel.app/user/login/`, {
            email: email,
            password: password,
        })
        return response.data;
    }
    catch (error) {
        throw (error);
    }
    /*
    .then((response) => {
        if (response.data.success) {
            return (response.data.user)
        }
        else {
            throw "Não foi possível entrar!"
        }
    }).catch(err => {
        throw err.message;
    })*/
}

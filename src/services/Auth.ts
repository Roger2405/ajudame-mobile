import api from "./api";

interface Response {
    user: {
        id: number,
        email: string
    },
    success: boolean,
    msg: string
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

export async function signIn(email: string, password: string): Promise<Response> {
    try {
        const response = await api.post(`/user/login/`, {
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

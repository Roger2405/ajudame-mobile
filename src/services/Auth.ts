import axios from "axios";

export async function userLogIn(email: string, password: string) {
    try {
        const response = await axios.post(`https://server-ajudame.vercel.app/user/login/`, {
            email: email,
            password: password,
        })
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.log(error, "Erro ao efetuar o LogIn");
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

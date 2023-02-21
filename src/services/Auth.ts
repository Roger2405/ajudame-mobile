import api from "./api";

interface Response {
    user: {
        id: number,
        email: string
    },
    success: boolean,
    msg: string
}

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
}
export async function signUp(email: string, password: string) {
    try {
        const response = await api.post(`/user/register/`, {
            email: email,
            password: password,
        })
        return response.data;
    }
    catch (error) {
        throw (error);
    }
}
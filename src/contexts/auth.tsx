import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';

interface AuthContextData {
    signed: boolean
    loading: boolean
    user: {
        id: number,
        email: string
    } | null
    signIn: (email: string, password: string) => Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


interface Props {
    children: ReactNode
}
export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<{
        id: number,
        email: string
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@AjudaME:user')

            if (storagedUser) {
                setUser(JSON.parse(storagedUser))
            }
        }
        loadStoragedData();
        setLoading(false);
    }, [])

    async function signIn(email: string, password: string) {
        const response = await auth.signIn(email, password);
        if (response.success) {
            await AsyncStorage.setItem('@AjudaME:user', JSON.stringify(response.user))
            setUser(response.user)
        }
        else {
            throw Error(response.msg)
        }
    }
    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
export { AuthContext, useAuth };